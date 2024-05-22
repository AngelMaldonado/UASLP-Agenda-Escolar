<?php

namespace App\Http\Controllers;

use App\Traits\RespuestasHttp;
use Illuminate\Http\Request;
use Laravel\Sanctum\PersonalAccessToken;

class SesionController extends Controller
{
    use RespuestasHttp;

    function index(Request $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $users = PersonalAccessToken::all()
            ->where('expires_at' , '>', now())
            ->map(function ($token) {
            return $token->tokenable;
        });

        if ($users->contains($request->user()))
            return $this->exito([
                'usuario' => $request->user(),
                'usuarios' => $users,
                'expiracion' => $request->user()->currentAccessToken()->expires_at
            ]);
        else
            return $this->error(['El usuario no tiene sesión activa'], 401);
    }

    function update(Request $request): \Illuminate\Foundation\Application|\Illuminate\Http\Response|\Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory
    {
        $currentExpiracy = $request->user()->currentAccessToken()->expires_at;
        $request->user()->currentAccessToken()->expires_at = $currentExpiracy->addMinutes(20);
        $request->user()->currentAccessToken()->save();
        return $this->exito(['Se extendió el tiempo del token']);
    }
}
