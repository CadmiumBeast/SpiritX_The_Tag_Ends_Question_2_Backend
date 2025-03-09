<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AuthController extends JsonController
{
    //Register User
    public function Register(Request $request)
    {
        try{
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users',
                'password' => 'required|string|min:6',
            ]);

            $user = new User([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
            ]);

            $user->save();

            return $this->sendResponse($user, 'User created successfully.');

        }catch (\Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    //Login User
    public function Login(Request $request)
    {
        try{
            $request->validate([
                'email' => 'required|email',
                'password' => 'required|string|min:6',
            ]);

            $credentials = request(['email', 'password']);

            if (! $token = auth()->attempt($credentials)) {
                return $this->sendError('Unauthorized', 'Unauthorized', 401);
            }

            return $this->respondWithToken($token);

        }catch (\Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }

    //Respond with token
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        $success = $this->respondWithToken(auth()->refresh());

        return $this->sendResponse($success, 'Refresh token return successfully.');
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return [
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'role' => auth()->user()->role
        ];
    }

    //current user
    public function Me()
    {
        return $this->sendResponse(auth()->user(), 'User retrieved successfully.');
    }

    //Logout user
    public function Logout()
    {
        auth()->logout();

        return $this->sendResponse([], 'User logged out successfully.');
    }

    //Admin Login
    public function AdminLogin(Request $request)
    {
        try{
            $request->validate([
                'password' => 'required|string|min:6',
            ]);

            $email = 'admin@example.com';
            $credentials = ['email' => $email, 'password' => $request->password];


            if (! $token = auth()->attempt($credentials)) {
                return $this->sendError('Unauthorized', 'Unauthorized', 401);
            }

            $user = auth()->user();

            if($user->role != 'admin') {
                return $this->sendError('Unauthorized', 'Unauthorized', 401);
            }

            return $this->respondWithToken($token);

        }catch (\Exception $e) {
            return $this->sendError('Error', $e->getMessage(), 500);
        }
    }
}
