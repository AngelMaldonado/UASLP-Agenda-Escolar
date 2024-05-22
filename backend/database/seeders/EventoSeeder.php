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
        //Evento::factory(10)->create();
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Inscripcion y pago de programas de posgrado",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 2,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Periodo de inscripcion y pago de colegiatura de los programas de posgrado"
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Periodo de verificacion de kardex",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 14,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Periodo de verificacion de kardex, por los alumnos de todas las carreras, a traves del portal de la Facultad de ingenieria, https://estudiantes.ing.uaslp.mx/, en caso de requerir correcciones, enviar correo a secretaria.escolar@ing.uaslp.mx"
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "1er. examen parcial de Quimica A, Calculo C y Calculo E",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 17,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "1er. examen parcial de: Quimica A de 7:00 a 8:30 horas. Calculo C y Calculo E de 8:30 a 10:00 horas."
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Inicio de servicio SAC",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 19,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Inicio de servicio SAC"
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Fecha limite para solicitar la correccion de kardex.",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 22,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Fecha limite para solicitar la correccion de kardex a traves del portal de la Facultad de Ingenieria, https://estudiantes.ing.uaslp.mx/"
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "1er. examen parcial de Algebra A, Algebra B y Calculo B",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 17,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "1er. examen parcial de: Algebra A y Algebra B de 7:00 a 8:30 horas. Calculo B de 8:30 a 10:00 horas."
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Pago e inscripcion para examen a regularizacion y acreditacion de materias",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 30,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Periodo para pago e inscripcion para presentar examen a regularizacion y acreditacion de materias de formacion humanistica y de la carrera por medio de caja virtual. (https://www.finanzas.uaslp.mx/CajaVirtual). No se pueden solicitar dos examenes a la misma hora y dia."
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Fecha limite para tramitar baja temporal",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 33,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Fecha limite para tramitar baja temporal en bajas@ing.uaslp.mx."
        ]);
        Evento::create([
            'usuario_id' => random_int(1, 3),
            'nombre' => "Periodo de pago de bajas de materias de la carrera.",
            'tipo' => TipoEventoEnum::FACULTAD,
            'simbolo_id' => 40,
            'fecha_inicio' => fake()->dateTimeThisMonth('+35 days'),
            'fecha_fin' => fake()->dateTimeThisMonth('+40 days'),
            'descripcion' => "Periodo de pago de bajas de materias de formacion humanistica y de la carrera. El pago posterior a esta fecha causara pago extemporaneo"
        ]);
    }
}
