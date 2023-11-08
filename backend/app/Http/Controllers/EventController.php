<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;


class EventController extends Controller
{
    // Función para almacenar un nuevo evento
    public function store(Request $request)
    {
        // Validar los datos de la solicitud utilizando las reglas de validación
        $request->validate([
            'title' => 'required|max:255',  // El título es obligatorio y no debe exceder los 255 caracteres.
            'start_date' => 'required|date', // La fecha de inicio es obligatoria y debe ser una fecha válida.
            'end_date' => [ // La fecha de fin es obligatoria, debe ser una fecha válida y debe ser posterior o igual a la fecha de inicio.
                'required',
                'date',
                'after_or_equal:start_date',
            ],
        ]);

        // Crear un nuevo evento en la base de datos utilizando los datos de la solicitud.
        $event = Event::create($request->all());

        // Retornar el evento creado en formato JSON como respuesta.
        return response()->json($event);
    }

    // Función para actualizar un evento existente
    public function update(Request $request, $id)
    {
        // Validar los datos de la solicitud utilizando las mismas reglas de validación.
        $request->validate([
            'title' => 'required|max:255',
            'start_date' => 'required|date',
            'end_date' => [
                'required',
                'date',
                'after_or_equal:start_date',
            ],
        ]);

        // Buscar el evento en la base de datos por su identificador.
        $event = Event::find($id);

        // Si el evento no se encuentra, devolver una respuesta de error con un código de estado 404.
        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        // Actualizar el evento con los datos de la solicitud.
        $event->update($request->all());

        // Retornar el evento actualizado en formato JSON como respuesta.
        return response()->json($event);
    }

    //Tipo DELETE
    public function destroy(Request $request, $id)
    {
        // Validar que el evento existe en la base de datos
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404); // Respuesta de error con código 404 (No encontrado).
        }

        // Eliminar el evento de la base de datos
        $event->delete();

        // Respuesta exitosa con un mensaje en formato JSON y código de estado 200 (OK).
        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }

    public function EventosCalendario(Request $request)
    {
        $mes = $request->input('mes');

        // Validar si el valor del parámetro "mes" es un número del 1 al 12 o "all"
        if ($mes === 'all') {
            // Consulta para obtener eventos de todos los meses ordenados por fecha
            $eventos = Event::orderBy('fecha_inicio', 'asc')->get();
        } elseif (is_numeric($mes) && $mes >= 1 && $mes <= 12) {
            // Consulta para obtener eventos del mes especificado
            $eventos = Event::whereMonth('fecha_inicio', $mes)->orderBy('fecha_inicio', 'asc')->get();
        } else {
            // Valor no válido para el parámetro "mes"
            return response()->json(['message' => 'Valor de mes no válido'], 400);
        }

        return response()->json($eventos);}

}
