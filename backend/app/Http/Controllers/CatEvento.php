<?php

namespace App\Http\Controllers;

class CatEvento extends Controller
{
    //
    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return \App\Models\CatEvento::all();
    }
}
