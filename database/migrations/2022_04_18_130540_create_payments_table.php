<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('payments', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger("flightId")->nullable();
            $table->string("checkoutRequestId");
            $table->string("mpesaReceipt")->nullable();
            $table->string("phoneNumber")->nullable();
            $table->string("amountPaid")->nullable();
            $table->string("transactionDate")->nullable();
            $table->string("transactionStatus")->nullable();
            $table->foreign("flightId")->references("id")->on("flights")->onDelete("cascade");
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
        Schema::dropIfExists('payments');
    }
}
