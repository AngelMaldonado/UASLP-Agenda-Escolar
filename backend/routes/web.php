<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AdminUserController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
//Ruta para el CRUD de usuarios
Route::middleware(['auth'])->group(function () {
    Route::resource('admin/users', AdminUserController::class);
});

Route::get('/', function () {
    return view('welcome');
});
