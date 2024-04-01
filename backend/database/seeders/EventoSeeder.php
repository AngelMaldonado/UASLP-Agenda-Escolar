<?php

namespace Database\Seeders;

use App\Enums\TipoEventoEnum;
use App\Models\Evento;
use Illuminate\Database\Seeder;

class EventoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Evento::factory(10)->create();
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => fake()->sentence(),
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => random_int(1, 127),
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'hipervinculos' => [fake()->url(), fake()->url(), fake()->url(), fake()->url(), fake()->url()],
            'descripcion' => fake()->paragraph()
        ]);
    }
}
