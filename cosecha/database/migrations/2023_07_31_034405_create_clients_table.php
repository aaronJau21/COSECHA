<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('clients', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->string('phone');
            $table->string('info')->nullable();
            $table->string('email');
            $table->string('business_name')->nullable();

            $table->unsignedBigInteger('location_id');
            $table->unsignedBigInteger('service_id');
            $table->unsignedBigInteger('area_id');

            $table->foreign('location_id')->references('id')->on('locations');
            $table->foreign('service_id')->references('id')->on('services');
            $table->foreign('area_id')->references('id')->on('areas');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('clients');
    }
};
