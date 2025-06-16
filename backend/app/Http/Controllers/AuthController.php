<?php

//namespace is important for autoloading the class without needing to include the file manually
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    // Register method stays exactly the same - no changes
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'User registered successfully'], 201);
    }

    // Updated login method with JWT
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors(),
            ], 422);
        }

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid credentials',
            ], 401);
        }

        try {
            // Create JWT token
            $token = JWTAuth::fromUser($user);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Could not create token'
            ], 500);
        }

        return response()->json([
            'message' => 'Login successful',
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
            ]
        ]);
    }

    // Updated logout method with JWT
    public function logout(Request $request)
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Logged out successfully']);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Failed to logout, please try again'
            ], 500);
        }
    }

    // Additional JWT methods
    public function me(Request $request)
    {
        return response()->json(auth()->user());
    }

    //this function is used to let the user refresh their JWT token
    // It will return a new token if the old one is still valid
    // If the old token is invalid, it will return an error
    // This is useful for keeping the user logged in without requiring them to log in again
    //when user suppose to be logged in but the token is expired, they can use this endpoint to get a new token
    public function refresh()
    {
        try {
            $newToken = JWTAuth::refresh(JWTAuth::getToken());
            return response()->json([
                'token' => $newToken
            ]);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'Token cannot be refreshed'
            ], 401);
        }
    }
}

