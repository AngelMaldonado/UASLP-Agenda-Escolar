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

    use Illuminate\Http\Request;
    use App\Models\Usuario;
    
    public function update(Request $request)
    {
        // Definición de reglas de validación para los campos del objeto JSON
        $rules = [
            'nombre' => 'required|string|max:50',  // El nombre es obligatorio y no debe exceder 50 caracteres.
            'puesto' => 'required|string|max:30',  // El puesto es obligatorio y no debe exceder 30 caracteres.
            'email' => 'required|string|email|unique:usuario,email,' . $request->input('id'), // El email es obligatorio, debe ser una dirección de correo electrónico válida y único en la tabla de usuarios, excepto para el usuario con el mismo ID.
            'permisos' => 'required|json', // Asegúrate de que los datos del campo "permisos" se manejen adecuadamente como JSON.
        ];
    
        // Definición de mensajes de error personalizados
        $messages = [
            'required' => 'El campo :attribute es obligatorio.',
            'string' => 'El campo :attribute debe ser una cadena de caracteres.',
            'max' => 'El campo :attribute no debe exceder los :max caracteres.',
            'email' => 'El campo :attribute debe ser una dirección de correo electrónico válida.',
            'unique' => 'El campo :attribute ya está en uso.',
            'json' => 'El campo :attribute debe ser un JSON válido.',
        ];
    
        // Validación de la solicitud usando las reglas definidas
        $validator = Validator::make($request->all(), $rules, $messages);
    
        // Comprobar si la validación falló
        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400); // Respuesta de error con mensajes de validación y código de estado 400 (Bad Request).
        }
    
        // Actualizar el usuario en la base de datos
        $usuario = Usuario::findOrFail($request->input('id'));
        $usuario->nombre = $request->input('nombre');
        $usuario->puesto = $request->input('puesto');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // Asegúrate de que los datos del campo "permisos" se manejen adecuadamente como JSON.
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
