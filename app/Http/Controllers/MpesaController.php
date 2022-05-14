<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MpesaController extends Controller
{
    public function getAuthToken(){
       $ch = curl_init('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials');
        curl_setopt_array($ch,
        array(
            CURLOPT_HTTPHEADER=>['Content-Type:application/json:charset-utf8'],
    		CURLOPT_RETURNTRANSFER=>true,
    		CURLOPT_HEADER=>false,
    		CURLOPT_USERPWD=>env('MPESA_CONSUMER_KEY').":".env('MPESA_CONSUMER_SECRET') 
        )
    );

        $response = json_decode(curl_exec($ch));
        curl_close($ch);
        return $response->access_token;
    }


    public function simulatePayment(Request $req){
        $fields=array(
            "BusinessShortCode"=> 174379,
            "Password"=> "MTc0Mzc5YmZiMjc5ZjlhYTliZGJjZjE1OGU5N2RkNzFhNDY3Y2QyZTBjODkzMDU5YjEwZjc4ZTZiNzJhZGExZWQyYzkxOTIwMjIwMjA4MTUwNzUx",
            "Timestamp"=> "20220208150751",
            "TransactionType"=> "CustomerPayBillOnline",
            "Amount"=> $req->totalPrice,
            "PartyA"=> "254".$req->phoneNumber,
            "PartyB"=> 174379,
            "PhoneNumber"=> "254".$req->phoneNumber,
            "CallBackURL"=> env('MPESA_CALLBACK_URL')."/api/payment-response",
            "AccountReference"=> "Payment for Flight",
            "TransactionDesc"=> "Payment of Flight id ".$req->flightID, 
        );
        $ch = curl_init('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest');
        curl_setopt($ch, CURLOPT_HTTPHEADER, [
            'Authorization: Bearer '.$this->getAuthToken(),
            'Content-Type: application/json'
        ]);
        curl_setopt_array(
            $ch,
            array(
                CURLOPT_RETURNTRANSFER=>true,
                CURLOPT_POST=>true,
                CURLOPT_POSTFIELDS=>json_encode($fields),

            )
    );

    $response = json_decode(curl_exec($ch));
    curl_close($ch);
    return $response;
    }
}
