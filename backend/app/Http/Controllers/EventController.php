<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\Rule;

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
    
    public function EventosCalendario($fecha)
    {
        // Validar el formato de la fecha
        $validator = Validator::make(['fecha' => $fecha], [
        'fecha' => 'date_format:Y-m-d',
        ]);

        // Comprobar si la validación falló
        if ($validator->fails()) {
            return response()->json(['message' => 'Formato de fecha no válido'], 400); // Puedes ajustar el código de estado (400 para datos no válidos)
        }

        // Consulta la base de datos para obtener los eventos del día
        $events = Event::whereDate('fecha', $fecha)->get();

        return response()->json($events);
    }

}
