<?php

namespace Database\Seeders;

use App\Models\Filtro;
use Illuminate\Database\Seeder;

class FiltroSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csv = fopen(base_path('database/data/datos_filtro.txt'), 'r');
        while(($filtro = fgetcsv($csv, 400, ',')) !== FALSE) {
            Filtro::create([
                'nombre' => $filtro['1'],
                'icono' => $filtro['2']
            ]);
        }
        fclose($csv);
    }
}
