<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

// Protected route - now uses auth:api instead of auth:sanctum
    //API secuered by This part
Route::middleware(['auth:api'])->get('/user', function (Request $request) {
    return $request->user();
});

// Public routes
            //end point                        //controller method
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Protected routes - require JWT token
Route::middleware(['auth:api'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
});

