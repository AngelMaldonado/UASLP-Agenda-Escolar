<?php

namespace Database\Factories;

use App\Enums\TipoEventoEnum;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Date;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Evento>
 */
class EventoFactory extends Factory
{
    public static int $MaxEventsFactory = 5;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'usuario_id' => random_int(1, 3),
            'nombre' => fake()->sentence(),
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => random_int(1, 127),
            'fecha_inicio' => fake()->dateTimeThisMonth('-' . random_int(0, 5) . ' days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+' . random_int(0, 10) . ' days'),
            'hipervinculos' => [fake()->url(), fake()->url(), fake()->url(), fake()->url(), fake()->url()],
            'descripcion' => fake()->paragraph()
        ];
    }
}
