<?php

// Codigo para el UsuarioController
//  Este código define los métodos para listar usuarios (index), crear un nuevo usuario (create y store), editar un usuario existente (edit y update), y eliminar un usuario (destroy).


namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\Casts\Json;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Http;

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

    public function store(Request $request): Usuario
    {
        // Validación de datos aquí
        // Crear un nuevo usuario
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombre');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // Asegúrate de que los datos se manejen adecuadamente como JSON.
        $usuario->save();

        return $usuario;
    }

    public function edit($id)
    {
        $usuario = Usuario::findOrFail($id);
        return response()->json($usuario);
    }

    public function update(Request $request)
    {
        // Validar los datos recibidos en la solicitud
        $request->validate([
            'id' => 'required|exists:usuario', // Asegurarse de que el usuario exista
            'nombre' => 'required|string|max:50',
            'tipo' => 'required|string|max:30',
            'email' => 'required|string|email|unique:usuario,email,' . $request->input('id'),
            'permisos' => 'required|array', // Asegurarse de que los datos de permisos se manejen adecuadamente como JSON.
        ]);

        // Obtener el ID del usuario a actualizar
        $userId = $request->input('id');

        // Buscar el usuario en la base de datos
        $usuario = Usuario::findOrFail($userId);

        // Actualizar los datos del usuario con los valores recibidos en la solicitud
        $usuario->nombre = $request->input('nombre');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // Asegurarse de que los datos de permisos se manejen adecuadamente como JSON.

        // Guardar los cambios en la base de datos
        $usuario->save();

        // Respuesta exitosa con el usuario actualizado en formato JSON y código de estado 200 (OK).
        return response()->json($usuario, 200);
    }


    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado'], 200);
    }
}
