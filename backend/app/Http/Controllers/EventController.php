<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;

class EventController extends Controller
{
    // Obtener eventos para un mes específico o todos los meses
    public function index(Request $request)
    {
        // Verificar si se proporciona un mes en la solicitud
        $month = (int)$request->input('mes');

        if ($month === 'all') {
            // Obtener todos los eventos
            $events = Event::all();
        } elseif (is_numeric($month) && $month >= 1 && $month <= 12) {
            // Obtener eventos para un mes específico
            $events = Event::whereMonth('fecha_inicio', $month)->get();
        } else {
            return response()->json(['message' => 'Mes no válido'], 400);
        }

        return response()->json($events);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'usuario_id' => 'required|exists:usuario,id',
            'nombre' => 'required|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'hipervinculos' => 'array',
            'imagen' => 'string|max:200',
            'descripcion' => 'string|max:250',
            'tipo' => 'string|max:10',
            'cat_evento_id' => 'exists:cat_evento,id',
            'areas' => 'array',
            'comunidades' => 'array',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 400);
        }

        $eventData = $request->all();

        // Asociar áreas a eventos
        $areas = $eventData['areas'] ?? [];
        unset($eventData['areas']);

        // Asociar comunidades a eventos
        $comunidades = $eventData['comunidades'] ?? [];
        unset($eventData['comunidades']);

        $event = Event::create($eventData);

        $event->areas()->attach($areas);
        $event->comunidades()->attach($comunidades);

        return response()->json($event);
    }

    // Actualizar un evento existente
    public function update(Request $request, $id)
    {
        try {
            $validator = Validator::make($request->all(), [
                'cat_evento_id' => 'exists:cat_evento,id',
                'usuario_id' => 'exists:usuario,id',
                'nombre' => 'max:100',
                'fecha_inicio' => 'date',
                'fecha_fin' => 'date|after_or_equal:fecha_inicio',
                'hipervinculos' => 'json',
                'imagen' => 'string|max:200',
                'descripcion' => 'string|max:250',
                'tipo' => 'string|max:10',
            ]);

            if ($validator->fails()) {
                throw new ValidationException($validator);
            }

            $event = Event::find($id);

            if (!$event) {
                return response()->json(['message' => 'Evento no encontrado'], 404);
            }

            $event->update($request->all());

            return response()->json($event);
        } catch (ValidationException $e) {
            return response()->json(['errors' => $e->errors()], 400);
        }
    }

    // Eliminar un evento
    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }
}
