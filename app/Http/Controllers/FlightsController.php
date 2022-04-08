<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Flight;

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
}
