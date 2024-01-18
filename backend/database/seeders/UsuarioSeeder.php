<?php

namespace Database\Seeders;

use App\Enums\TipoUsuarioEnum;
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
            'tipo' => TipoUsuarioEnum::BECARIO,
            'nombre' => 'Angel de Jesús',
            'apellido' => 'Maldonado Juárez',
            'email' => 'a292363@alumnos.uaslp.mx',
            'permisos' => Json::encode(['Crear Eventos', 'Modificar Eventos', 'Eliminar Eventos']),
        ]);
        DB::table('usuario')->insert([
            'tipo' => TipoUsuarioEnum::BECARIO,
            'nombre' => 'Erika Guadalupe',
            'apellido' => 'Granados Grifaldo',
            'email' => 'a284665@alumnos.uaslp.mx',
            'permisos' => Json::encode(['Crear Usuarios', 'Modificar Usuarios', 'Eliminar Usuarios']),
        ]);
    }
}
