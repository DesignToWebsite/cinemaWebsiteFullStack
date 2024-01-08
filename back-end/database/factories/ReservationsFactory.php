<?php

namespace Database\Factories;

use App\Models\Movies;
use App\Models\users;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservations>
 */
class ReservationsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
/***
 * $table->id();
            $table->integer('user_id');
            $table->integer('movie_id');
            $table->integer('placesReserved');
            $table->string('seats');
            $table->strig('food')->nullable;
            $table->float('price');
            $table->boolean('paid');
 */
     public function definition(): array
    {
        return [
            'users_id'=>Users::factory(),
            'movies_id'=>Movies::factory(),
            'placesReserved'=>1,
            'seats'=>$this->faker->numberBetween(1,50),
            'price' => $this->faker->numberBetween(100,300),
            
        ];
    }
}
