<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Psy\Util\Json;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('usuario')->insert([
            'nombre' => Str::random(10),
            'tipo' => Str::random(10),
            'email' => Str::random(5).'@gmail.com',
            'permisos' => Json::encode(['a', 'b', 'c']),
        ]);
    }
}
