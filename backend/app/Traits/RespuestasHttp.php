<?php

namespace App\Traits;

trait RespuestasHttp
{
    protected function exito($datos, $mensaje = null, $codigo = 200): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        return response($datos, $codigo);
    }

    protected function error($datos, $codigo, $mensaje = null): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        return response(['errors' => $datos, 'message' => $mensaje], $codigo);
    }
}
