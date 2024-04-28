<?php

namespace App\Http\Controllers;

use App\Enums\TipoUsuarioEnum;
use App\Http\Requests\LoginRequest;
use App\Models\Usuario;
use App\Traits\RespuestasHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AutenticacionController extends Controller
{
    use RespuestasHttp;

    function login(LoginRequest $request)
    {
        $request->validated($request->all());

        $usuario = null;

        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value ||
            $request->input('tipo') === TipoUsuarioEnum::ADMINISTRADOR->value) {

            if (!Auth::attempt(['email' => $request->email, 'password' => $request->contraseña]))
                return $this->error('', 'credenciales erróneas', 401);

            $usuario = Usuario::where('email', $request->email)->first();
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {

            // Modificar el método de ValidaUsuarioServicio para que valide rpe con contraseña
            if (!Usuario::ValidaUsuarioServicio($request->rpe, $request->contraseña))
                return $this->error('', 'credenciales erróneas', 401);

            $usuario = Usuario::where('rpe', $request->rpe)->first();
        }

        $usuario->token = $usuario->createToken('API Token de ' . $usuario->nombre)->plainTextToken;
        return $this->exito(['usuario' => $usuario]);
    }

    function logout()
    {
        Auth::user()->currentAccessToken()->delete();
        return $this->exito('', 'Se cerró sesión con éxito');
    }
}
