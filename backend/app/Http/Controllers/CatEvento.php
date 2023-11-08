<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class CatEvento extends Controller
{
    //
    public function index(): \Illuminate\Http\JsonResponse
    {
        //$usuarios = Usuario::all();
        //return response()->json($usuarios);

        $eventos = DB::select('select * from cat_evento');
        return response()->json($eventos);
    }
}
