<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Movies>
 */
class MoviesFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $randomDay = $this->faker->randomElement(['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']);
        $randomTime = $this->faker->dateTimeBetween('09:00', '23:59')->format('H:i');
        $video = "YoHD9XEInc0";
        $placesRoom = 50;
        $roomNumber = 'S' . $this->faker->numberBetween(1, 6);
        $img = 'https://www.themoviedb.org/t/p/original/xlaY2zyzMfkhk0HSC5VUwzoZPU1.jpg';

        $namesString = implode(', ', array_map(fn () => $this->faker->name, range(1, 5)));

        $category = $this->faker->randomElement(['Scienc Fiction','Action','Horror','Mestery','Comedy']);
        return [
            'name' => $this->faker->sentence($this->faker->numberBetween(1, 5)),
            'img' => $img,
            'video' => $video,
            'description' => $this->faker->paragraph(),
            'day'=> $randomDay,
            'time'=> $randomTime,
            'salle' => $roomNumber,
            'actors' => $namesString,
            'category' =>  $category,
            'star' => $this->faker->numberBetween(51, 99),
            'year'=>$this->faker->year(),
            'price'=>$this->faker->numberBetween(100,200),
            'placesRoom'=>$placesRoom,
            'top'=>$this->faker->randomElement([true,false]),
            'age'=>$this->faker->randomElement(['18+','18-']),
        ];
    }
}
