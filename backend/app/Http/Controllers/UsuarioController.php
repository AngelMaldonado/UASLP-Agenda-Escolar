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

    public function store(Request $request): RedirectResponse
    {
        // Validación de datos aquí
        // Crear un nuevo usuario
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombres') . $request->input('apellidos');
        $usuario->tipo = $request->input('tipo');
        $usuario->email = $request->input('email');
        $usuario->permisos = Json::encode($request->input('permisos')); // Asegúrate de que los datos se manejen adecuadamente como JSON.
        $usuario->save();

        return redirect('/administrador');
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
            'puesto' => 'required|string|max:30',
            'email' => 'required|string|email|unique:usuario,email,' . $id,
            'permisos' => 'required|json', // Asegúrate de que los datos se manejen adecuadamente como JSON.
        ];

        $messages = [
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser una cadena de caracteres.',
            'max' => 'El campo :attribute no debe exceder los :max caracteres.',
            'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
            'unique' => 'El campo :attribute ya está en uso.',
            'json' => 'El campo :attribute debe ser un JSON válido.',
        ];

        $validator = Validator::make($request->all(), $rules, $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        // Actualizar el usuario
        $usuario = Usuario::findOrFail($id);
        $usuario->nombre = $request->input('nombre');
        $usuario->puesto = $request->input('puesto');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // Asegúrate de que los datos se manejen adecuadamente como JSON.
        $usuario->save();

        return response()->json($usuario, 200);
    }

    public function destroy($id): \Illuminate\Http\JsonResponse
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();

        return response()->json(['message' => 'Usuario eliminado'], 200);
    }
}
