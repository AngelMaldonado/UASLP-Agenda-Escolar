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

        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value) {
            $validator->addRules(['email' => 'required|string|email']);
            if ($validator->fails()) return response($validator->errors(), 400);

            if (!Auth::attempt(['email' => $request->email, 'contraseña' => $request->contraseña]))
                return response('credenciales erróneas', 401);

            $usuario = Usuario::where('email', $request->email)->first();
            $usuario->createToken('API Token de ' . $usuario->nombre);
            return response($usuario, 200);
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            $validator->addRules(['rpe' => 'required|digits:6']);
            if ($validator->fails()) return response($validator->errors(), 400);
        }

        return 'login';
    }

    function logout()
    {
        return 'logout';
    }
}
