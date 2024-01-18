<?php

namespace App\Http\Controllers;

class CatEvento extends Controller
{
    //
    public function index(): \Illuminate\Http\JsonResponse
    {
        $cat_eventos = \App\Models\CatEvento::all();
        return response()->json($cat_eventos);
    }
}
