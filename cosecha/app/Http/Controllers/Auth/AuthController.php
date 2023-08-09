<?php

namespace App\Http\Controllers\Auth;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:10',
            'userName' => 'required|unique:users,userName',
            'password' => 'required|min:6'
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'msg' => 'Missing data',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::create([
            'name' => $request->name,
            'userName' => $request->userName,
            'password' => bcrypt($request->password),
        ]);


        return new JsonResponse([
            'status' => 200,
            'msg' => 'User created successfully',
            'user' => $user
        ], 200);
    }

    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'userName' => 'required',
            'password' => 'required'
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'msg' => 'Missing data',
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('userName', $request->userName)->first();

        if (!$user || !password_verify($request->password, $user->password)) {
            return new JsonResponse([
                'status' => 401,
                'msg' => 'Invalid credentials'
            ], 401);
        }

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Login successful',
            'user' => $user
        ], 200);
    }
}
