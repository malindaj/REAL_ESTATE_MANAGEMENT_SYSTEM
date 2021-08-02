<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePropertiesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->double('price', 8, 2);
            $table->boolean('featured')->default(false);
            $table->enum('purpose', ['sale', 'rent'])->nullable();
            $table->enum('type', ['house', 'apartment']);
            $table->string('image')->nullable();
            $table->string('image2')->nullable();
            $table->string('image3')->nullable();
            $table->integer('bedroom')->nullable();
            $table->integer('bathroom')->nullable();
            $table->integer('garages')->nullable();
            $table->string('city');
            $table->string('address');
            $table->integer('area')->nullable();
            $table->integer('agent_id');
            $table->text('description');
            $table->string('video')->nullable();
            $table->string('floor_plan')->nullable();
            $table->string('location_latitude')->nullable();
            $table->string('location_longitude')->nullable();
            $table->text('nearby')->nullable();
            $table->boolean('air_conditioning')->nullable();
            $table->boolean('heating')->nullable();
            $table->boolean('balcony')->nullable();
            $table->boolean('parking')->nullable();
            $table->boolean('internet')->nullable();
            $table->boolean('cable_tv')->nullable();
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
        Schema::dropIfExists('properties');
    }
}
