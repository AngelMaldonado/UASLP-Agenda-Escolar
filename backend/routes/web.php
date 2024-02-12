<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Ruta para el CRUD de usuarios
Route::middleware(['auth'])->get('/user', function (Request $request) {
    return $request->user();
});
