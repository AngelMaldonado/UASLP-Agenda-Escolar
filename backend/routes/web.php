<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\EventController;

//Ruta para el CRUD de usuarios
Route::middleware(['auth'])->get('/user', function (Request $request) {
    return $request->user();
});
//Ruta para mostrar eventos en FullCalendar
Route::get('/eventos/{fecha}', [EventController::class, 'showEventsByDay']);


Route::controller(UsuarioController::class)->group(function (){
    Route::get('/usuarios', 'index');
    Route::post('/usuarios', 'store');
});
