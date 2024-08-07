<?php
// TODO: cuando se tenga el servicio cambiar usuario_service_rpe en las funciones del controlador

namespace App\Http\Controllers;

use App\Enums\TipoUsuarioEnum;
use App\Http\Requests\ActualizaUsuarioRequest;
use App\Http\Requests\NuevoUsuarioRequest;
use App\Traits\RespuestasHttp;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Usuario;

class UsuarioController extends Controller
{
    use RespuestasHttp;

    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return Usuario::all();
    }

    public function store(NuevoUsuarioRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validated($request->all());

        // Inicializa un nuevo usuario con el tipo y los permisos
        $usuario = new Usuario($request->only('tipo', 'permisos', 'contraseña'));

        // Si es becario
        if ($usuario->tipo === TipoUsuarioEnum::BECARIO) {
            $usuario->fill($request->only('nombre', 'apellido', 'email'));
            $usuario->contraseña = Hash::make($request->input('contraseña'));
            // Si es administrador secundario
        } else if ($usuario->tipo === TipoUsuarioEnum::SECUNDARIO) {
            // Busca al usuario en el servicio con el rpe PETICIÓN
            $usuario_servicio = Usuario::UsuarioDesdeServicio($request->input('rpe'), $request->input('contraseña'));

            // Si encontró un usuario en el servicio con el rpe y el email que tiene aún no está en el sistema de agenda
            if ($usuario_servicio) {
                $validator = Validator::make($usuario_servicio->only('email'), ['email' => 'email|unique:usuario,email']);
                if ($validator->fails())
                    return $this->error($validator->errors(), 400);
                $usuario->fill($usuario_servicio->only('rpe', 'nombre', 'apellido', 'email'));
            } else
                return $this->error(['rpe' => 'el rpe no existe'], 400);
        }

        $usuario->save();
        return $this->exito($usuario, 'Usuario guardado con éxito');
    }

    public function update(ActualizaUsuarioRequest $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $request->validated($request->all());

        // Busca el usuario en la base de datos
        $usuario_sistema = Usuario::find($request->input('id'));

        // Si el USUARIO PETICIÓN es administrador secundario
        if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            // Si el USUARIO SISTEMA antes era becario o el rpe PETICIÓN es distinto al que actualmente tiene
            if ($usuario_sistema->tipo === TipoUsuarioEnum::BECARIO->value || (
                    $usuario_sistema->tipo === TipoUsuarioEnum::SECUNDARIO->value &&
                    $usuario_sistema->rpe !== $request->input('rpe')
                ))
                // Valida que el rpe PETICIÓN no esté en el sistema de agenda
                Validator::validate($request->only('rpe'), ['rpe' => 'unique:usuario,rpe']);

            // Busca al usuario en el servicio con el rpe PETICIÓN
            $usuario_servicio = Usuario::UsuarioDesdeServicio($request->input('rpe'), $request->input('contraseña'));
            if ($usuario_servicio) {
                // Si el email cambió desde el servicio
                if ($usuario_servicio->email !== $usuario_sistema->email)
                    Validator::validate($usuario_servicio->email, ['email' => 'unique:usuario,email']);

                $usuario_servicio->fill($usuario_servicio->only('rpe', 'nombre', 'apellido', 'email'));
            } else return $this->error($request->input('rpe'), 'El rpe no existe', 400);

        } else if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            // Si el email es distinto
            if ($request->input('email') !== $usuario_sistema->email)
                Validator::validate($request->only('email'), ['email' => 'unique:usuario,email']);

            $usuario_sistema->fill($request->only('nombre', 'apellido', 'email'));
            $usuario_sistema->contraseña = Hash::make($request->input('contraseña'));
            $usuario_sistema->rpe = null;
        } else if ($request->input('tipo') === TipoUsuarioEnum::ADMINISTRADOR->value) {
            $usuario_sistema->contraseña = Hash::make($request->input('contraseña'));
            $usuario_sistema->email = $request->input('email');
        }

        $usuario_sistema->fill($request->only('tipo', 'permisos'));
        $usuario_sistema->save();
        return $this->exito($usuario_sistema, 'Usuario actualizado con éxito');
    }


    public function destroy(Request $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validate(['id' => 'required|exists:usuario,id']);

        // Buscar el usuario en la base de datos
        $usuario = Usuario::find($request->input('id'));

        // Eliminar el usuario de la base de datos
        $usuario->delete();

        return $this->exito('Usuario eliminado con éxito');
    }
}
