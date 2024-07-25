<?php

namespace Database\Seeders;

use App\Models\Evento;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventosFiltrosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $eventos = Evento::all();
        foreach ($eventos as $evento) {
            $numFilters = fake()->numberBetween(1, 7);
            $filterCountStart = fake()->numberBetween(1, 7);
            for ($start = 1; $start <= $numFilters; $start++) {
                DB::table('eventos_filtros')->insert([
                    'evento_id' => $evento->id,
                    'filtro_id' => $filterCountStart++
                ]);
            }
        }
    }
}
