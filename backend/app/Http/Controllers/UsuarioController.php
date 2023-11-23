<?php

// Codigo para el UsuarioController
//  Este código define los métodos para listar usuarios (index), crear un nuevo usuario (create y store), editar un usuario existente (edit y update), y eliminar un usuario (destroy).


namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Http;
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
            'nombre' => 'required|string|max:50',
            'tipo' => 'required|in:Administrador Secundario,Becario',
            'email' => 'required|string|email|unique:usuario,email',
            'permisos' => 'required|array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Crear el usuario
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombre');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos');
        $usuario->save();

        // Asignar permisos al usuario
        foreach ($request->input('permisos') as $permiso) {
            $permission = Permission::firstOrCreate(['name' => $permiso]);
            $usuario->givePermissionTo($permission);
        }

        return response()->json($usuario, 200);
    }

    public function edit($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    public function update(Request $request, $id): \Illuminate\Http\JsonResponse
    {
        $rules = [
            'nombre' => 'required|string|max:50',
            'tipo' => 'required|string|max:30',
            'email' => 'required|string|email|unique:usuario,email,' . $id,
            'permisos' => 'required|array', // Asegúrate de que los datos se manejen adecuadamente como un arreglo.
        ];

        $messages = [
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser una cadena de caracteres.',
            'max' => 'El campo :attribute no debe exceder los :max caracteres.',
            'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
            'unique' => 'El campo :attribute ya está en uso.',
            'array' => 'El campo :attribute debe ser un arreglo.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Actualizar el usuario
        $usuario = Usuario::findOrFail($id);
        $usuario->nombre = $request->input('nombre');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->save();

        // Limpiar permisos antiguos del usuario
        $usuario->syncPermissions([]);

        // Asignar permisos al usuario
        foreach ($request->input('permisos') as $permiso) {
            $permission = Permission::firstOrCreate(['name' => $permiso]);
            $usuario->givePermissionTo($permission);
        }

        return response()->json($usuario, 200);
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
