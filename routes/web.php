<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\FlightsController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


Route::get('/', function () {
    return redirect('/home');
});
Route::get('/home', function () {
    return view('home');
});

Route::get('/add-flight', function () {
    return view('addFlight');
});
Route::middleware(['auth:sanctum', 'verified'])->get('/dashboard', function () {
    return view('dashboard');
})->name('dashboard');

Route::get("/user-logout",[AuthController::class,'LogoutUser'])->middleware("auth");

Route::post('/add-flight',[FlightsController::class,"addFlight"]);
Route::get('/add-booking',[FlightsController::class,"fetchBookingPage"]);

Route::get("/all-flights",[FlightsController::class,"getAllFlights"]);

Route::get("/get-flight/{id}",[FlightsController::class,"getFlight"]);

Route::post("/add-passengers",[FlightsController::class,"addPassengers"]);
