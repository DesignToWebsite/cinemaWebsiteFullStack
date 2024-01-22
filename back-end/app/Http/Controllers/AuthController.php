<?php
// app/Http/Controllers/AuthController.php

namespace App\Http\Controllers;

use App\Models\Users;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    private $status_code = 200;

    public function login(Request $request)
    {
        $email = Users::where('email', $request->email)->first();
        if (!is_null($email)) {
            $password = Users::where('email', $request->email)->where("password", $request->password)->first();
            if (!is_null($password)) {
                $user = $this->userDetail($request->email);
                return response()->json(["status" => $this->status_code, "success" => true, "message" => "You have logged in successfully", "data" => $user],200);

            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Incorrect password."],401);
            }

        } else {
            return response()->json(["status" => "failed", "success" => false, "message" => "Unable to login. Email doesn't exist."],404);
        }
    }

    public function userDetail($email)
    {
        $user = array();
        if ($email != "") {
            $user = Users::where("email", $email)->first();
            return $user;
        }
    }
}
