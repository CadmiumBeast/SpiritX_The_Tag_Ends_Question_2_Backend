<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CSVController;
use App\Http\Controllers\PlayerController;
use App\Http\Controllers\TeamController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::group(
    [
        'prefix' => 'auth',
        'middleware' => 'api',
    ]
    , function ($router) {
        Route::post('register', [AuthController::class, 'Register']);
        Route::post('login', [AuthController::class, 'Login']);
        Route::post('logout', [AuthController::class, 'Logout']);
        Route::post('refresh', [AuthController::class, 'Refresh']);
        Route::get('me', [AuthController::class, 'Me']);
    }
);

Route::post('upload', [CSVController::class, 'upload'])->middleware('auth:api');

Route::middleware('auth:api')->group(
    function () {
        Route::get('admin/players',[PlayerController::class, 'index'] );
        Route::get('players/{id}', 'TeamController@show');
        Route::post('players', 'TeamController@store');
        Route::put('players/{id}', 'TeamController@update');
        Route::delete('players/{id}', 'TeamController@delete');
    }
);

Route::post('admin/login', [AuthController::class, 'AdminLogin']);
Route::get('admin/summary', [AdminController::class, 'index'])->middleware('auth:api');

Route::get('dashboard', [TeamController::class, 'Dashboard'])->middleware('auth:api');

