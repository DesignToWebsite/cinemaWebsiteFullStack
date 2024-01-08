<?php

namespace Database\Seeders;

use App\Models\Movies;
use App\Models\Reservations;
use App\Models\Users;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Users::factory()->count(20)->create();
        Users::factory()
            ->count(20)
            ->has(
                Reservations::factory()
            )
            ->create();

        Users::factory()
        ->count(10)
        ->has(
            Reservations::factory()
            ->count(3)
        )
        ->create();
    }
}
