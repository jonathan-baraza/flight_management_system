<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateFlightsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('flights', function (Blueprint $table) {
            $table->id();
            $table->string("departure_location");
            $table->string("destination_location");
            $table->string("departure_date");
            $table->string("arrival_date");
            $table->string("class_A_capacity");
            $table->string("class_A_price");
            $table->string("class_B_capacity");
            $table->string("class_B_price");
            $table->string("class_C_capacity");
            $table->string("class_C_price");
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('flights');
    }
}
