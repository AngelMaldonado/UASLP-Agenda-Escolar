<?php

// Codigo para el AdminUserController
//  Este código define los métodos para listar usuarios (index), crear un nuevo usuario (create y store), editar un usuario existente (edit y update), y eliminar un usuario (destroy).


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;

class AdminUserController extends Controller
{
    public function index()
    {
        $usuarios = Usuario::all();
        return view('admin.usuarios.index', compact('usuarios'));
    }

    public function create()
    {
        return view('admin.usuarios.create');
    }

    public function store(Request $request)
    {
        // Validación de datos aquí
        // Crear un nuevo usuario
        $usuario = new Usuario();
        $usuario->nombre = $request->input('nombre');
        $usuario->puesto = $request->input('puesto');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // Asegúrate de que los datos se manejen adecuadamente como JSON.
        $usuario->save();

        return redirect()->route('admin.usuarios.index');
    }

    public function edit($id)
    {
        $usuario = Usuario::findOrFail($id);
        return view('admin.usuarios.edit', compact('usuario'));
    }

    public function update(Request $request, $id)
    {
        // Validación de datos aquí
        // Actualizar el usuario
        $usuario = Usuario::findOrFail($id);
        $usuario->nombre = $request->input('nombre');
        $usuario->puesto = $request->input('puesto');
        $usuario->email = $request->input('email');
        $usuario->permisos = $request->input('permisos'); // revisar el manejo de JSON.
        $usuario->save();

        return redirect()->route('admin.usuarios.index');
    }

    public function destroy($id)
    {
        $usuario = Usuario::findOrFail($id);
        $usuario->delete();

        return redirect()->route('admin.usuarios.index');
    }
}