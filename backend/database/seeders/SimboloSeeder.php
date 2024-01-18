<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SimboloSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        for($i = 0; $i < 127; $i++)
            DB::table('simbologia')->insert([
                'simbolo' => 'imagenes/simbolos/' . $i + 1 . '.webp'
            ]);
    }
}
