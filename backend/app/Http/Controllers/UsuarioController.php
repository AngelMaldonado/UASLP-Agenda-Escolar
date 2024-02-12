<?php
// TODO: cuando se tenga el servicio cambiar usuario_service_rpe en las funciones del controlador

namespace App\Http\Controllers;

use App\Enums\PermisosEnum;
use App\Enums\TipoUsuarioEnum;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Validation\Rule;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsuarioController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function store(Request $request)
    {
        // Valida tipo y permisos
        $validator = Validator::make($request->all(), [
            'tipo' => ['required', Rule::enum(TipoUsuarioEnum::class)],
            'permisos' => 'required|array',
            'permisos.*' => [Rule::in(PermisosEnum::values())]
        ]);

        if ($validator->fails()) return response($validator->errors(), 400);

        // Inicializa un nuevo usuario con el tipo y los permisos
        $usuario = new Usuario();
        $usuario->tipo = $request->input('tipo');
        $usuario->permisos = $request->input('permisos');

        // Si es becario
        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            // Valida el nombre, apellido, email, y contraseña
            $validator->addRules([
                'nombre' => 'required|string|max:50',
                'apellido' => 'required|string|max:50',
                'email' => 'required|string|email|unique:usuario,email',
                'contraseña' => 'required|string|max:60|min:6|confirmed',
            ]);

            if ($validator->fails()) return response($validator->errors(), 400);

            $usuario->nombre = $request->input('nombre');
            $usuario->apellido = $request->input('apellido');
            $usuario->email = $request->input('email');
            $usuario->contraseña = Hash::make($request->input('contraseña'));
            // Si es administrador secundario
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            // Valida el rpe
            $validator->addRules(['rpe' => 'required|digits:6|unique:usuario,rpe']);
            if ($validator->fails()) return response($validator->errors(), 400);

            // Busca al usuario en el servicio con el rpe PETICIÓN
            $usuario_servicio = Usuario::UsuarioDesdeServicio($request->input('rpe'));

            // Si encontró un usuario en el servicio con el rpe y el email que tiene aún no está en el sistema de agenda
            if ($usuario_servicio) {
                if ($validator->validateUnique('email', $usuario_servicio->email, ['usuario'])) {
                    $usuario->rpe = $usuario_servicio->rpe;
                    $usuario->nombre = $usuario_servicio->nombre;
                    $usuario->apellido = $usuario_servicio->apellido;
                    $usuario->email = $usuario_servicio->email;
                }
                else return response($validator->errors(), 400);
            } else return response()->json(['rpe' => 'El rpe no existe'], 400);
        }

        $usuario->save();
        $usuario->createToken('API Token de ' . $usuario->nombre);
        return response()->json($usuario, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:usuario,id',
            'tipo' => ['required', Rule::enum(TipoUsuarioEnum::class)],
            'permisos' => 'required|array',
            'permisos.*' => [Rule::in(PermisosEnum::values())]
        ]);

        if ($validator->fails()) return response($validator->errors(), 400);

        // Busca el usuario en la base de datos
        $usuario_sistema = Usuario::find($request->input('id'));

        // Si el USUARIO PETICIÓN es administrador secundario
        if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            // Valida que exista el rpe en USUARIO PETICIÓN
            $validator->addRules(['rpe' => 'required']);
            if ($validator->fails()) return response($validator->errors(), 400);

            // Si el USUARIO SISTEMA antes era becario o el rpe PETICIÓN es distinto al que actualmente tiene
            if ($usuario_sistema->tipo === TipoUsuarioEnum::BECARIO->value ||
                ($usuario_sistema->tipo === TipoUsuarioEnum::SECUNDARIO->value &&
                    $usuario_sistema->rpe !== $request->input('rpe'))
            ) {
                // Valida que el rpe PETICIÓN no esté en el sistema de agenda
                $validator->addRules(['rpe' => 'unique:usuario,rpe']);
                if ($validator->fails()) return response($validator->errors(), 400);
            }

            // Busca al usuario en el servicio con el rpe PETICIÓN
            $usuario_servicio = Usuario::UsuarioDesdeServicio($request->input('rpe'));
            if ($usuario_servicio) {
                // Si el email cambió desde el servicio
                if ($usuario_servicio->email !== $usuario_sistema->email)
                    // Valida que no esté el email en el sistema
                    if (!$validator->validateUnique('email', $usuario_servicio->email, ['usuario']))
                        return response($validator->errors(), 400);
                $usuario_sistema->rpe = $request->input('rpe'); // $usuario->rpe;
                $usuario_sistema->nombre = $usuario_servicio->nombre;
                $usuario_sistema->apellido = $usuario_servicio->apellido;
                $usuario_sistema->email = $usuario_servicio->email;
                dd($usuario_sistema);
            } else return response()->json(['rpe' => 'El rpe no existe'], 400);

        } else if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            // Valida el nombre y los apellidos
            $validator->addRules([
                'nombre' => 'required|string|max:50',
                'apellido' => 'required|string|max:50',
                'contraseña' => 'required|string|max:60|min:6|confirmed',
            ]);
            if ($validator->fails()) return response($validator->errors(), 400);

            // Si el email es distinto
            if ($request->input('email') !== $usuario_sistema->email)
                // Valida que no esté el email en el sistema
                if (!$validator->validateUnique('email', $request->input('email'), ['usuario']))
                    return response($validator->errors(), 400);

            $usuario_sistema->nombre = $request->input('nombre');
            $usuario_sistema->apellido = $request->input('apellido');
            $usuario_sistema->email = $request->input('email');
            $usuario_sistema->contraseña = Hash::make($request->input('contraseña'));
            $usuario_sistema->rpe = null;
        }

        $usuario_sistema->tipo = $request->input('tipo');
        $usuario_sistema->permisos = $request->input('permisos');
        $usuario_sistema->save();
        return response()->json($usuario_sistema, 200);

        /*
        // Limpiar permisos antiguos del usuario
        $usuario->syncPermissions([]);

        // Asignar permisos al usuario
        foreach ($request->input('permisos') as $permiso) {
            $permission = Permission::firstOrCreate(['name' => $permiso]);
            $usuario->givePermissionTo($permission);
        }

        return response()->json($usuario, 200);
        */
    }


    public function destroy(Request $request)
    {
        // Buscar el usuario en la base de datos
        $usuario = Usuario::findOrFail($request->input('id'));

        // Eliminar el usuario de la base de datos
        $usuario->delete();

        // Respuesta exitosa con un mensaje en formato JSON y código de estado 200 (OK).
        return response('Usuario eliminado', 200);
    }

    public function asignarRol($usuarioId, $nombreRol)
    {
        $usuario = Usuario::find($usuarioId);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $rol = Role::where('name', $nombreRol)->first();

        if (!$rol) {
            return response()->json(['message' => 'Rol no encontrado'], 404);
        }

        $usuario->assignRole($rol);

        return response()->json(['message' => 'Rol asignado con éxito'], 200);
    }

    public function asignarPermiso($usuarioId, $nombrePermiso)
    {
        $usuario = Usuario::find($usuarioId);

        if (!$usuario) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }

        $permiso = Permission::where('name', $nombrePermiso)->first();

        if (!$permiso) {
            return response()->json(['message' => 'Permiso no encontrado'], 404);
        }

        $usuario->givePermissionTo($permiso);

        return response()->json(['message' => 'Permiso asignado con éxito'], 200);
    }

}
