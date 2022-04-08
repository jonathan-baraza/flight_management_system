<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;
    protected $fillable=["departure_location","destination_location","departure_date","arrival_date","class_A_capacity","class_A_price","class_B_capacity","class_B_price","class_C_capacity","class_C_price"];
    
    protected $table="flights";
}
