<?php

use App\Http\Controllers\AutenticacionController;
use App\Http\Controllers\CatEvento;
use App\Http\Controllers\FiltroController;
use App\Http\Controllers\SesionController;
use App\Http\Controllers\SimbologiaController;
use App\Http\Controllers\UsuarioController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EventoController;

/*
|--------------------------------------------------------------------------
| Rutas de la API
|--------------------------------------------------------------------------
|
| Aqu� es donde puedes registrar las rutas de la API para tu aplicaci�n. Estas
| rutas son cargadas por RouteServiceProvider y todas ellas ser�n
| asignadas al grupo de middleware "api".
|
*/

/** Rutas p�blicas (cualquier usuario puede hacer peticiones) **/
Route::post('/login', [AutenticacionController::class, 'login']);
Route::get('/eventos', [EventoController::class, 'index']);
Route::get('/filtros', [FiltroController::class, 'index']);
Route::get('/simbolos', [SimbologiaController::class, 'index']);

/** Rutas protegidas por sanctum (solo usuarios autenticados pueden hacer peticiones) **/
Route::group(['middleware' => ['auth:sanctum']], function () {
    // Grupo de peticiones para obtener informaci�n de la sesi�n actual
    Route::controller(SesionController::class)->group(function () {
        Route::get('/sesion', [SesionController::class, 'index']);
        Route::put('/sesion', [SesionController::class, 'update']);
    });

    // Petición para cerrar sesión
    Route::post('/logout', [AutenticacionController::class, 'logout']);

    // Grupo de peticiones para CRUD de usuarios
    Route::controller(UsuarioController::class)->group(function () {
        Route::get('/usuarios', 'index');
        Route::post('/usuarios', 'store');
        Route::put('/usuarios', 'update');
        Route::delete('/usuarios', 'destroy');
    });

    // Grupo de peticiones para CUD de eventos
    Route::controller(EventoController::class)->group(function () {
        Route::post('/eventos', 'store');
        Route::put('/eventos', 'update');
        Route::delete('/eventos', 'destroy');
    });

    // Grupo de peticiones para lectura del cat�logo de eventos
    Route::controller(CatEvento::class)->group(function () {
        Route::get('/cat_eventos', 'index');
    });

    // Grupo de peticiones para CRUD de filtros
    Route::controller(FiltroController::class)->group(function () {
        Route::post('/filtros', 'store');
        Route::put('/filtros', 'update');
        Route::delete('/filtros', 'destroy');
    });

    // Grupo de peticiones para CRUD de s�mbolos
    Route::controller(SimbologiaController::class)->group(function () {
        Route::post('/simbolos', 'store');
        Route::put('/simbolos', 'update');
        Route::delete('/simbolos', 'destroy');
    });
});
