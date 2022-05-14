<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\MpesaController;
use App\Http\Controllers\MpesaResponseController;


// header('Access-Control-Allow-Origin: *');
// //Access-Control-Allow-Origin: *
// header('Access-Control-Allow-Methods:  POST, GET, OPTIONS, PUT, DELETE');
// header('Access-Control-Allow-Headers:  Content-Type, X-Auth-Token, Origin, Authorization');
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("/simulate-payment",[MpesaController::class,'simulatePayment']);
Route::post('payment-response',[MpesaResponseController::class,'handleMpesaResponse']);

Route::get("/search-payment/{checkoutRequestId}",[MpesaResponseController::class,"searchPayment"]);
Route::post("/update-booking",[MpesaResponseController::class,"updatePayment"]);