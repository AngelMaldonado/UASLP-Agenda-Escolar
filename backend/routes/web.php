<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;

//Ruta para el CRUD de usuarios
Route::middleware(['auth'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UsuarioController::class)->group(function (){
    Route::get('/usuarios', 'index');
    Route::post('/usuarios', 'store');
});
