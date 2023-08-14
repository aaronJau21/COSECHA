<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'name' => ['required', 'min:3'],
            'user' => ['required', 'unique:users,user'],
            'password' => ['required', 'min:3']
        ]);

        if ($validate->fails()) {
            return new JsonResponse([
                'status' => 400,
                'errors' => $validate->errors()
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'user' => $request->user,
            'password' => bcrypt($request->password)
        ]);

        return new JsonResponse([
            'status' => 200,
            'token' =>  $user->createToken('authToken')->plainTextToken,
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $validate = Validator::make($request->all(), [
            'user' => ['required'],
            'password' => ['required']
        ]);

        if ($validate->fails()) {
            return new JsonResponse([
                'status' => 400,
                'errors' => $validate->errors()
            ], 400);
        }

        $user = User::where('user', $request->user)->first();
        if (!$user || !password_verify($request->password, $user->password)) {
            return new JsonResponse([
                'status' => 401,
                'msg' => 'Invalid credentials'
            ], 401);
        };

        return new JsonResponse([
            'status' => 200,
            'token' => $user->createToken('authToken')->plainTextToken,
            'user' => $user,
        ], 200);
    }

    public function logout(Request $request)
    {
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return [
            'user' => null
        ];
    }
}
