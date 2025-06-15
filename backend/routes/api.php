<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

//only authenticated users with valid token can access this route(testing)
Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
            //endpoint                         //controller method
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
