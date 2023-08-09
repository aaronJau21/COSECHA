<?php

use App\Http\Controllers\AreasController;
use App\Http\Controllers\Auth\AuthController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\LocationsController;
use App\Http\Controllers\ServicesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::post('/register', [AuthController::class, 'store']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/areas', [AreasController::class, 'getAreas']);
Route::get('/areas-paginate', [AreasController::class, 'getAreasPaginate']);
Route::post('/area/{id}', [AreasController::class, 'updateState']);

Route::get('/locations', [LocationsController::class, 'getLocations']);
Route::get('/services', [ServicesController::class, 'getServices']);

// CLIENTS
Route::post('/clients/create', [ClientController::class, 'createClient']);
Route::get('/clients', [ClientController::class, 'getClients']);
Route::get('/client/{id}', [ClientController::class, 'getClientById']);
Route::put('/client/{id}/update', [ClientController::class, 'updateClient']);
Route::delete('/client/{id}', [ClientController::class, 'delete']);
