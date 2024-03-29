<?php


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MoviesController;
use App\Http\Controllers\ReservationsController;
use App\Http\Controllers\UsersController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PaymentController;


// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });

// Route::get('/user',[UsersController::class, 'index']);
// Route::get('/users/{id}',[UsersController::class, 'show']);
//App\Http\Controllers

Route::group(['namespace'=> 'App\Http\Controllers'], function(){
    Route::apiResource('users',UsersController::class);
    Route::apiResource('movies',MoviesController::class);
    Route::apiResource('reservations',ReservationsController::class);
});
Route::post('/login',[AuthController::class, 'login']);
Route::post('/create-payment-intent', [PaymentController::class, 'createPaymentIntent']);
