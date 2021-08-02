<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;


class AuthController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api', ['except' => ['login', 'register']]);
    }

    public function login(Request $request){
//        $credentials = $request->only('email', 'password');
//        if ($token = $this->guard()->attempt($credentials)) {
//            return response()->json(['status' => 'success'], 200)->header('Authorization', $token);
//        }
//        return response()->json(['error' => 'login_error'], 401);
//        print($request);
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:3',

        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        if (! $token = auth()->attempt($validator->validated())) {
            return response()->json(['error' => 'Either email or password is wrong.',], 401);
        }

        return $this->createNewToken($token);

    }

    public function register(Request $request) {
        $v = Validator::make($request->all(), [
            'email' => 'required|email|unique:users',
            'password'  => 'required|confirmed|min:3',
        ]);
        if ($v->fails())
        {
            return response()->json([
                'status' => 'error',
                'errors' => $v->errors()
            ], 422);
        }

        $user = new User;
        if ($request->file('image')) {
            $imagePath = $request->file('image');
            $imageName = $imagePath->getClientOriginalName();

            $path = $request->file('image')->storeAs('uploads', $imageName, 'public');
        }



        $user->email = $request->email;
        $user->name = $request->name;
        $user->role_id = intval($request->role_id);
        $user->image = '/storage/'.$path;
        $user->bio = $request->bio;
        $user->phone_number = $request->phone_number;
        $user->password = bcrypt($request->password);
        $user->save();
        return response()->json(['status' => 'success','user' => $user], 200);
    }

    public function logout() {
        auth()->logout();

        return response()->json(['message' => 'User successfully signed out']);
    }

//    public function refresh() {
//        return $this->createNewToken(auth()->refresh());
//    }

    public function userProfile() {
        return response()->json(auth()->user());
    }

    protected function createNewToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'user' => auth()->user(),

        ]);
    }
    private function guard()
    {
        return Auth::guard();
    }




}
