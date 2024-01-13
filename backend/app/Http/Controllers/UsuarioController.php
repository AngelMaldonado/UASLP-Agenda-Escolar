<?php

// Codigo para el UsuarioController
//  Este código define los métodos para listar usuarios (index), crear un nuevo usuario (create y store), editar un usuario existente (edit y update), y eliminar un usuario (destroy).


namespace App\Http\Controllers;

use App\Enums\TipoUsuarioEnum;
use GuzzleHttp\Client;
use GuzzleHttp\Exception\GuzzleException;
use http\Env\Response;
use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Http;
use Illuminate\Validation\Rule;
use Mockery\Exception;
use Spatie\Permission\Traits\HasRoles;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class UsuarioController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        $usuarios = Usuario::all();
        return response()->json($usuarios);
    }

    public function create()
    {
        // Puedes retornar un JSON vacío o un mensaje indicando que la creación se realiza en otro lugar si lo prefieres.
        return response()->json([], 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo' => [Rule::enum(TipoUsuarioEnum::class)],
            'permisos' => 'required|array',
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);

        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            $validator->addRules([
                'nombre' => 'required|string|max:50',
                'apellido' => 'required|string|max:50',
                'email' => 'required|string|email|unique:usuario,email',
            ]);
            if ($validator->fails())
                return response()->json(['errors' => $validator->errors()], 400);
            $usuario = new Usuario();
            $usuario->tipo = $request->input('tipo');
            $usuario->nombre = $request->input('nombre');
            $usuario->apellido = $request->input('apellido');
            $usuario->email = $request->input('email');
            $usuario->permisos = $request->input('permisos');
            $usuario->save();
            return response()->json($usuario, 200);
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            $validator->addRules([
                'rpe' => 'required|unique:usuario,rpe',
            ]);
            if ($validator->fails())
                return response()->json(['errors' => $validator->errors()], 400);

            try {
                // Busca usuario en servicio rpe...
                // $usuario = Http::get('http://servicio.com?rpe=123456');
                $client = new Client();
                $u_id = intval(((string)$request->input('rpe'))[5]) + 1;
                $res = json_decode($client->get(
                    'https://jsonplaceholder.typicode.com/users?id=' . $u_id)
                    ->getBody()->getContents());

                // Si encontró al usuario
                if (count($res) === 1) {
                    $usuario = $res[0];
                    if ($validator->validateUnique('email', $usuario->email, ['usuario'])) {
                        $usuario_sistema = new Usuario();
                        $usuario_sistema->tipo = $request->input('tipo');
                        $usuario_sistema->permisos = $request->input('permisos');
                        $usuario_sistema->rpe = $request->input('rpe'); // $usuario->rpe; <- tiene que ser del $usuario
                        $usuario_sistema->nombre = explode(' ', $usuario->name)[0];
                        $usuario_sistema->apellido = explode(' ', $usuario->name)[1];
                        $usuario_sistema->email = $usuario->email;
                        $usuario_sistema->save();
                        return response()->json($usuario_sistema, 200);
                    }
                    else
                        return response()->json(['errors' => ['El usuario ya existe en el sistema.'], 400]);
                } else
                    return response()->json(['errors' => ['RPE inválido']]);
            } catch (GuzzleException $e) {
                return response()-> json(['errors' => [$e->getMessage()]]);
            }
        } else
            return response()->json(['errors' => ['Tipo de usuario inválido.']]);

        // Crear el usuario
        /*
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombre');
        $usuario->apellido = $request->input('apellido');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos');
        $usuario->rpe = $request->input('rpe');
        $usuario->save();

        // Asignar permisos al usuario
        foreach ($request->input('permisos') as $permiso) {
            $permission = Permission::firstOrCreate(['name' => $permiso]);
            $usuario->givePermissionTo($permission);
        }

        return response()->json($usuario, 200);
        */
    }

    public function update(Request $request): \Illuminate\Http\JsonResponse
    {
        $rules = [
            'id' => 'required|exists:usuario,id',
            'tipo' => [Rule::enum(TipoUsuarioEnum::class)],
            'permisos' => 'required|array',
            //'nombre' => 'required|string|max:50',
            //'apellido' => 'required|string|max:50',
            //'email' => 'required|string|email|unique:usuario,email,' . $id,
            //'rpe' => 'unique:usuario,rpe,' . $id,
        ];

        $messages = [
            'required' => 'El campo :attribute es obligatorio.',
            'exists' => 'El usuario no existe en la base de datos',
            'array' => 'El campo :attribute debe ser un arreglo.',
            //'string' => 'El campo :attribute debe ser una cadena de caracteres.',
            //'max' => 'El campo :attribute no debe exceder los :max caracteres.',
            //'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
            //'unique' => 'El campo :attribute ya está en uso.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Busca el usuario en la base de datos
        $usuario_sistema = Usuario::find($request->input('id'));

        // Si el usuario petición es administrador secundario
        if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            // Valida que exista el rpe en usuario petición
            $validator->addRules([
                'rpe' => 'required',
            ]);
            if ($validator->fails())
                return response()->json(['errors' => $validator->errors()], 400);

            // Si el usuario antes era becario o el rpe petición es distinto al que tenía antes
            if ($usuario_sistema->tipo === TipoUsuarioEnum::BECARIO->value ||
                ($usuario_sistema->tipo === TipoUsuarioEnum::SECUNDARIO->value &&
                    $usuario_sistema->rpe !== $request->input('rpe'))) {
                $validator->addRules([
                    'rpe' => 'unique:usuario,rpe',
                ]);
                if ($validator->fails())
                    return response()->json(['errors' => $validator->errors()], 400);
            }

            // Busca usuario en servicio rpe...
            // $usuario = Http::get('http://servicio.com?rpe=123456');
            // Busca usuario en servicio rpe...
            // $usuario = Http::get('http://servicio.com?rpe=123456');
            try {
                $client = new Client();
                $u_id = intval(((string)$request->input('rpe'))[5]) + 1;
                $res = json_decode($client->get(
                    'https://jsonplaceholder.typicode.com/users?id=' . $u_id)
                    ->getBody()->getContents());

                if (count($res) === 1) {
                    $usuario = $res[0];
                    // Si el email cambió desde el servicio
                    if ($usuario->email !== $usuario_sistema->email) {
                        // Valida que no esté el email en el sistema
                        if (!$validator->validateUnique('email', $usuario->email, ['usuario']))
                            return response()->json(['errors' => ['El usuario ya existe en el sistema.'], 400]);
                    }
                    $usuario_sistema->tipo = $request->input('tipo');
                    $usuario_sistema->permisos = $request->input('permisos');
                    $usuario_sistema->rpe = $request->input('rpe'); // $usuario->rpe;
                    $usuario_sistema->nombre = explode(' ', $usuario->name)[0];
                    $usuario_sistema->apellido = explode(' ', $usuario->name)[1];
                    $usuario_sistema->email = $usuario->email;
                    $usuario_sistema->save();
                    return response()->json($usuario_sistema, 200);
                } else
                    return response()->json(['errors' => ['El rpe es inválido.']]);

            } catch (GuzzleException $e) {
                return response()->json(['errors' => [$e->getMessage()]]);
            }
        } else if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            $validator->addRules([
                'nombre' => 'required|string|max:50',
                'apellido' => 'required|string|max:50',
            ]);
            if ($validator->fails())
                return response()->json(['errors' => $validator->errors()], 400);

            // Si el email es distinto
            if ($request->input('email') !== $usuario_sistema->email) {
                // Valida que no esté el email en el sistema
                if (!$validator->validateUnique('email', $request->input('email'), ['usuario']))
                    return response()->json(['errors' => ['El usuario ya existe en el sistema.'], 400]);
            }
            $usuario_sistema->tipo = $request->input('tipo');
            $usuario_sistema->nombre = $request->input('nombre');
            $usuario_sistema->apellido = $request->input('apellido');
            $usuario_sistema->email = $request->input('email');
            $usuario_sistema->permisos = $request->input('permisos');
            $usuario_sistema->rpe = null;
            $usuario_sistema->save();
            return response()->json($usuario_sistema, 200);
        } else
            return response()->json(['errors' => ['Tipo de usuario inválido.']]);
        /*
        $usuario->nombre = $request->input('nombre');
        $usuario->apellido = $request->input('apellido');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->rpe = $request->input('rpe');
        $usuario->save();

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
        return response()->json(['message' => 'Usuario eliminado'], 200);
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
