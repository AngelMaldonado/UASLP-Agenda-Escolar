<?php

use App\Http\Controllers\AutenticacionController;
use App\Http\Controllers\CatEvento;
use App\Http\Controllers\FiltroController;
use App\Http\Controllers\SimbologiaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::controller(AutenticacionController::class)->group(function (){
    Route::post('/login', 'login');
    Route::post('/logout', 'logout');
});

Route::controller(UsuarioController::class)->group(function (){
  Route::get('/usuarios', 'index');
  Route::post('/usuarios', 'store');
  Route::put('/usuarios', 'update');
  Route::delete('/usuarios', 'destroy');
});

//Ruta para mostrar eventos en FullCalendar
//Route::get('/eventos/{fecha}', [EventoController::class, 'showEventsByDay']);

Route::controller(EventoController::class)->group(function(){
  Route::get('/eventos', 'index');
  Route::post('/eventos', 'store');
  Route::put('/eventos', 'update');
  Route::delete('/eventos', 'destroy');
});

Route::controller(CatEvento::class)->group(function(){
  Route::get('/cat_eventos', 'index');
});

Route::controller(FiltroController::class)->group(function(){
  Route::get('/filtros', 'index');
  Route::post('/filtros', 'store');
  Route::put('/filtros', 'update');
  Route::delete('/filtros', 'destroy');
});

Route::controller(SimbologiaController::class)->group(function (){
  Route::get('/simbolos', 'index');
  Route::post('/simbolos', 'store');
  Route::put('/simbolos', 'update');
  Route::delete('/simbolos', 'destroy');
});

