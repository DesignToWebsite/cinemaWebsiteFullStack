<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\UsersResource;
use App\Models\User;
use App\Http\Controllers\Controller;
class UserController extends Controller
{
    public function index(){
        return User::all();
    }
    // public function show(User $users)
    // {
    //     return new UserResource($movie);
    // }
    public function show($id)
    {
        $movie = User::find($id);
    
        if (!$movie) {
            return response()->json(['error' => 'reservation not found'], 404);
        }
    
        return new UsersResource($movie);
    }
}
