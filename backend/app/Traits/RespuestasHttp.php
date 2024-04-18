<?php

namespace App\Traits;

trait RespuestasHttp
{
    protected function exito($datos, $mensaje = null, $codigo = 200): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'Petición realizada con éxito.',
            'message' => $mensaje,
            'data' => $datos
        ], $codigo);
    }

    protected function error($datos, $mensaje = null, $codigo): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => 'Error con la petición.',
            'message' => $mensaje,
            'data' => $datos
        ], $codigo);
    }
}
