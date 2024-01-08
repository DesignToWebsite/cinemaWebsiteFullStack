<?php

namespace Database\Seeders;

use App\Models\Movies;
use App\Models\Reservations;
use App\Models\Users;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reservations::factory()
        //     ->count(25)
        //     ->for(Users::factory())
        //     ->for(Movies::factory())
        //     ->create();

        // Reservations::factory()
        // ->count(5)
        // ->for(Users::factory())
        // ->for(Movies::factory())
        // ->create();
        // Users::all()->each(function ($user){
        //     Reservations::factory()
        //         ->count(5)
        //         ->for($user)
        //         ->for(Movies::factory())
        //         ->create();
        // });

    }
}
