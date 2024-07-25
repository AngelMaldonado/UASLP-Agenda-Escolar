<?php

namespace App\Http\Controllers;

use App\Enums\TipoUsuarioEnum;
use App\Http\Requests\LoginRequest;
use App\Models\Usuario;
use App\Traits\RespuestasHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Laravel\Sanctum\PersonalAccessToken;

class AutenticacionController extends Controller
{
    use RespuestasHttp;

    function login(LoginRequest $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $request->validated($request->all());

        $usuario = null;

        if ($request->input('tipo') === TipoUsuarioEnum::BECARIO->value ||
            $request->input('tipo') === TipoUsuarioEnum::ADMINISTRADOR->value) {

            if (!Auth::attempt(['email' => $request->email, 'password' => $request->contraseña]))
                return $this->error(['backend' => 'credenciales erróneas'], 401);

            $usuario = Usuario::where('email', $request->email)->first();
        } else if ($request->input('tipo') === TipoUsuarioEnum::SECUNDARIO->value) {
            // Modificar el método de ValidaUsuarioServicio para que valide rpe con contraseña
            if (!Usuario::UsuarioDesdeServicio($request->rpe, $request->contraseña))
                return $this->error(['backend' => 'credenciales erróneas'], 401);

            $usuario = Usuario::where('rpe', $request->rpe)->first();
        }

        $tokens_usuario = PersonalAccessToken::all()->where('tokenable_id', '=', $usuario->id);
        if ($tokens_usuario->where('expires_at', '>', now())->count())
            return $this->error(['backend' => 'este usuario ya tiene una sesión activa'], 400);
        else if ($tokens_usuario->count())
            PersonalAccessToken::destroy($tokens_usuario);

        $usuario->token = $usuario->createToken(
            'Token de ' . $usuario->nombre,
            ['*'], now()->addMinutes(20)
        )->plainTextToken;

        return $this->exito($usuario);
    }

    function logout(Request $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $request->user()->currentAccessToken()->delete();
        return $this->exito('Se cerró sesión con éxito');
    }
}
