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

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('logout', [AuthController::class, 'logout']);
    // Areas
    Route::get('areas', [AreasController::class, 'getAreas']);
    Route::put('area/{id}', [AreasController::class, 'updateArea']);
    Route::get('/areas-paginate', [AreasController::class, 'getAreasPaginate']);

    // Locations
    Route::get('locations', [LocationsController::class, 'getLocations']);

    // Sercice
    Route::get('services', [ServicesController::class, 'getServices']);

    // Clientes
    Route::post('/clients/create', [ClientController::class, 'createClient']);
    Route::get('/clients', [ClientController::class, 'getClients']);
    Route::get('/client/{id}', [ClientController::class, 'getClientById']);
    Route::put('/client/{id}/update', [ClientController::class, 'updateClient']);
    Route::delete('/client/{id}', [ClientController::class, 'delete']);
});

Route::post('register', [AuthController::class, 'register']);
Route::post('login', [AuthController::class, 'login']);

Route::get('/areas/shared', [ClientController::class, 'sharedAreas']);
Route::get('/services/shared', [ClientController::class, 'sharedServices']);
