<?php

namespace Database\Seeders;

use App\Models\Usuario;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = \Faker\Factory::create();
        for($index = 0; $index < 50; $index++) {
            Usuario::create([
                'nombre' => $faker->name,
                'puesto' => $faker->sentence,
                'email' => $faker->email,
                'permisos' => $faker->sentence
            ]);
        }
    }
}
