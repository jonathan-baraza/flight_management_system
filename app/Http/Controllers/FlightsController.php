<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;
use App\Models\Passengers;
use App\Models\Payment;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class FlightsController extends Controller
{
    public function addFlight(Request $req){
        
        try{
            Flight::create([
                "departure_location"=>$req->departure_location,
                "destination_location"=>$req->destination_location,
                "departure_date"=>$req->departure_date,
                "arrival_date"=>$req->arrival_date,
                "class_A_capacity"=>$req->class_A_capacity,
                "class_A_price"=>$req->class_A_price,
                "class_B_capacity"=>$req->class_B_capacity,
                "class_B_price"=>$req->class_B_price,
                "class_C_capacity"=>$req->class_C_capacity,
                "class_C_price"=>$req->class_C_price,
            ]);
            return "success";

        }catch(Exception $e){
            return $e;
        }
    }


    public function getAllFlights(){
        $flights=Flight::all();
        return $flights;
    }

    public function fetchBookingPage(){
        return view("addBooking");
    }

    public function getFlight($id){
        $flight=Flight::find($id);
        return $flight;
    }

    public function addPassengers(Request $req){         
            $paymentDetails=Payment::where("phoneNumber","254".$req->phoneNumber)->where("transactionStatus","success")->first();
            //    $paymentDetails=Payment::where("phoneNumber",$req->phoneNumber)->first();
        sleep(1);
            try{
                   Passengers::create([
                        "flightId"=>$req->flightId,
                        "paymentId"=>$paymentDetails->id,
                        "firstName"=>$req->firstName,
                        "lastName"=>$req->lastName,
                        "age"=>$req->age,
                        "class"=>$req->class,
                    ]);
                    return "success";
            }
            catch(Exception $e){
                return $e;
            }
         
          
           
            return $paymentDetails;
               
    }

 
}
