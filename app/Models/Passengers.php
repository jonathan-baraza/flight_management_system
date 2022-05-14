<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Passengers extends Model
{
    use HasFactory;
    protected $fillable=["flightId","paymentId","firstName","lastName","age","class"];
    
    protected $table="passengers";

    public function flight(){
        return $this->belongsTo(Flight::class);
    }

   
}
