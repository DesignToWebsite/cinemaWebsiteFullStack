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
        Schema::create('movies', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('img');
            $table->string('video');
            $table->text('description');
            $table->string('day');
            $table->string('time');
            $table->string('salle');
            $table->text('actors');
            $table->string('category');
            $table->integer('star');
            $table->integer('year');
            $table->float('price');
            $table->integer('placesRoom');            
            $table->boolean('top');
            $table->string('age');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('movies');
    }
};
