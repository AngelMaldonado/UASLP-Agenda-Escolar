<?php

namespace App\Http\Controllers;

use App\Enums\TipoUsuarioEnum;
use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;

class AutenticacionController extends Controller
{
    function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo' => ['required', Rule::enum(TipoUsuarioEnum::class)],
            'contraseña' => 'required|string|max:60|min:6'
        ]);

        if ($validator->fails()) return response($validator->errors(), 400);

        $usuario = null;

        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value ||
            $request->input('tipo') === TipoUsuarioEnum::ADMINISTRADOR->value) {
            $validator->addRules(['email' => 'required|string|email']);

            if ($validator->fails()) return response($validator->errors(), 400);
            if (!Auth::attempt(['email' => $request->email, 'password' => $request->contraseña]))
                return response()->json(['auth' => 'credenciales erróneas'], 401);

            $usuario = Usuario::where('email', $request->email)->first();
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            $validator->addRules(['rpe' => 'required|digits:6|exists:usuario,rpe']);

            // Modificar el método de ValidaUsuarioServicio para que valide rpe con contraseña
            if (!Usuario::ValidaUsuarioServicio($request->rpe, $request->contraseña))
                return response()->json(['auth' => 'credenciales erróneas'], 401);

            if ($validator->fails()) return response($validator->errors(), 400);

            $usuario = Usuario::where('rpe', $request->rpe)->first();
        }

        $usuario->token = $usuario->createToken('API Token de ' . $usuario->nombre)->plainTextToken;
        return response($usuario, 200);
    }

    function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return response(['mensaje' => 'Se cerró sesión con éxito'], 200);
    }
}
