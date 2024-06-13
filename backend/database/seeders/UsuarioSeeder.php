<?php

namespace Database\Seeders;

use App\Enums\PermisosEnum;
use App\Enums\TipoUsuarioEnum;
use App\Models\Usuario;
use Illuminate\Database\Seeder;

class UsuarioSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Crea el usuario administrador principal
        $admin = Usuario::create([
            'nombre' => 'Administración',
            'apellido' => 'UASLP Ingeniería',
            'tipo' => TipoUsuarioEnum::ADMINISTRADOR,
            'email' => 'secretaria.general@uaslp.mx',
            'permisos' => PermisosEnum::values(),
            'contraseña' => '123456'
        ]);

        // Crea 5 usuarios tipo becario aleatorios
        //$usuarios = Usuario::factory(5)->create();
    }
}
