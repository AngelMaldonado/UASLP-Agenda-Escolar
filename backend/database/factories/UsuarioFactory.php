<?php

namespace Database\Factories;

use App\Enums\PermisosEnum;
use App\Enums\TipoUsuarioEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Usuario>
 */
class UsuarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => fake()->name(),
            'apellido' => fake()->lastName() . fake()->lastName(),
            'tipo' => TipoUsuarioEnum::BECARIO,
            'email' => fake()->email(),
            'permisos' => [PermisosEnum::cases()[rand(0,11)], PermisosEnum::cases()[rand(0, 11)]],
            'contraseña' => '123456'
        ];
    }
}
