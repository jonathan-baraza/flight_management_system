<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;
    protected $fillable=["flightId","checkoutRequestId","mpesaReceipt","phoneNumber","amountPaid","transactionDate","transactionStatus"];
    
    protected $table="payments";

    public function flight(){
        return $this->belongsTo(Flight::class);
    }
}
