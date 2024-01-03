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
            $table->timestamps();
            $table->string('name');
            $table->integer('date');
            $table->string('video');
            $table->text('description');
            $table->text('image');
            $table->string('salle');
            $table->integer('price');
            $table->string('day');
            $table->string('time');
            $table->string('actors');
            $table->integer('star');
            $table->boolean('top');
            $table->string('age');
            $table->string('categories');
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
