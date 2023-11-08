<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UsuarioController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\CatEvento;

//Ruta para el CRUD de usuarios
Route::middleware(['auth'])->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(UsuarioController::class)->group(function (){
    Route::get('/usuarios', 'index');
    Route::post('/usuarios', 'store');
    Route::put('/usuarios', 'update');
    Route::delete('/usuarios', 'destroy');
});

//Ruta para mostrar eventos en FullCalendar
//Route::get('/eventos/{fecha}', [EventController::class, 'showEventsByDay']);

Route::controller(EventController::class)->group(function(){
    Route::get('/eventos', 'EventosCalendario');
    Route::post('/eventos', 'store');
    Route::put('/eventos', 'update');
    Route::delete('/eventos', 'destroy');
});

Route::controller(CatEvento::class)->group(function(){
    Route::get('/cat_eventos', 'index');
   
   
    //Route::post('/cat_eventos', 'store');
    //Route::put('/cat_eventos', 'update');
    //Route::delete('/cat_eventos', 'destroy');
});