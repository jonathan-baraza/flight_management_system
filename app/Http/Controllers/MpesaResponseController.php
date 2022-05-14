<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use App\Models\Payment;
use Carbon\Carbon;

class MpesaResponseController extends Controller
{
    public function handleMpesaResponse(Request $req){
        Log::info("Response endpoint hit");
        Log::info($req->all());
        $responseArray=$req->all();


        $checkoutRequestId=$responseArray["Body"]["stkCallback"]["CheckoutRequestID"];       
        $record=Payment::where("checkoutRequestId",$checkoutRequestId)->get();

        $resultCode=$responseArray["Body"]["stkCallback"]["ResultCode"];
      
        $resultDescription=$responseArray["Body"]["stkCallback"]["ResultDesc"];
        
      
        if($resultCode==0){
            $responseMetaData=$responseArray["Body"]["stkCallback"]["CallbackMetadata"]; 
            $phoneNumber=$responseArray["Body"]["stkCallback"]["CallbackMetadata"]["Item"][4]["Value"];
            $amountPaid=$responseArray["Body"]["stkCallback"]["CallbackMetadata"]["Item"][0]["Value"];
            $mpesaReceipt=$responseArray["Body"]["stkCallback"]["CallbackMetadata"]["Item"][1]["Value"];
            $rawTransactionDate=$responseArray["Body"]["stkCallback"]["CallbackMetadata"]["Item"][3]["Value"];
            $dateObject=date("Y-m-d h:ia",$rawTransactionDate);
            $transactionDate=Carbon::createFromFormat("YmdHis",20220424223800);
           
            if(count($record)>0){
                Payment::where("checkoutRequestId",$checkoutRequestId)->update([
                "flightId"=>"1",
                "checkoutRequestId"=>$checkoutRequestId,
                "mpesaReceipt"=>$mpesaReceipt,
                "phoneNumber"=>$phoneNumber,
                "amountPaid"=>$amountPaid,
                "transactionDate"=>strval($transactionDate),
                "transactionStatus"=>"success",
            ]);
            }
            else{
                 Payment::create([
                "flightId"=>"1",
                "checkoutRequestId"=>$checkoutRequestId,
                "mpesaReceipt"=>$mpesaReceipt,
                "phoneNumber"=>$phoneNumber,
                "amountPaid"=>$amountPaid,
                "transactionDate"=>strval($transactionDate),
                "transactionStatus"=>"success",
            ]);
               
            }

        }
        else{
            Log::info("Payment Not Successfull");
            Log::info("Result Code ".$resultCode);
            Log::info($resultDescription);
            if(count($record)>0){
                Log::info("updating");
                Payment::where("checkoutRequestId",$checkoutRequestId)->update([
                "flightId"=>"1",
                "checkoutRequestId"=>$checkoutRequestId,
                "mpesaReceipt"=>"NULL",
                "phoneNumber"=>NULL,
                "amountPaid"=>NULL,
                "transactionDate"=>NULL,
                "transactionStatus"=>$resultDescription,
            ]);
            }
            else{
                Log::info("creating");
                Payment::create([
                "flightId"=>"1",
                "checkoutRequestId"=>$checkoutRequestId,
                "mpesaReceipt"=>"NULL",
                "phoneNumber"=>NULL,
                "amountPaid"=>NULL,
                "transactionDate"=>NULL,
                "transactionStatus"=>$resultDescription,
            ]);
            }
            
        }

    }

    public function searchPayment($checkoutRequestId){
        $paymentRecord=Payment::where("checkoutRequestId",$checkoutRequestId)->get();
        return $paymentRecord;       
    }

    public function updatePayment(Request $req){
        try {
            Payment::where("checkoutRequestId",$req->checkoutRequestID)->update([
                "flightId"=>$req->flightID,
                "checkoutRequestId"=>$req->checkoutRequestID,
            ]);
            return "success";
        } catch (\Throwable $th) {
            return $th;
        }
    }
}




