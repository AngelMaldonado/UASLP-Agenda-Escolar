<?php

namespace Database\Seeders;

use App\Models\CatEvento;
use Illuminate\Database\Seeder;

class CatEventoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $csv = fopen(base_path('database/data/datos_cat_evento.txt'), 'r');
        while(($cat_evento = fgetcsv($csv, 400, ',')) !== FALSE) {
            CatEvento::create([
                'nombre' => $cat_evento['1'],
                'descripcion' => $cat_evento['2'],
                'simbolo_id' => $cat_evento['3']
            ]);
        }
        fclose($csv);
    }
}
