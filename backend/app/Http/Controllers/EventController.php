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
        $request->validate([
            'cat_evento_id' => 'nullable|exists:cat_evento,id', // Validamos que cat_evento_id sea opcional y exista en la tabla cat_evento.
            'usuario_id' => 'required|exists:usuario,id', // Validamos que usuario_id sea obligatorio y exista en la tabla usuario.
            'nombre' => 'required|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => [
                'required',
                'date',
                'after_or_equal:fecha_inicio',
            ],
            'hipervinculos' => 'json',
            'imagen' => 'max:200',
            'descripcion' => 'max:250',
            'tipo' => 'max:10',
        ]);

        $event = Event::create($request->all());

        return response()->json($event);
    }

    // Función para actualizar un evento existente
    public function update(Request $request, $id)
    {
        $request->validate([
            'cat_evento_id' => 'nullable|exists:cat_evento,id',
            'usuario_id' => 'required|exists:usuario,id',
            'nombre' => 'required|max:100',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => [
                'required',
                'date',
                'after_or_equal:fecha_inicio',
            ],
            'hipervinculos' => 'json',
            'imagen' => 'max:200',
            'descripcion' => 'max:250',
            'tipo' => 'max:10',
        ]);

        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $event->update($request->all());

        return response()->json($event);
    }

    
    public function EventosCalendario(Request $request)
    {
        $mes = $request->input('mes');

        if ($mes === 'all') {
            $eventos = Event::orderBy('fecha_inicio', 'asc')->get();
        } elseif (is_numeric($mes) && $mes >= 1 && $mes <= 12) {
            $eventos = Event::whereMonth('fecha_inicio', $mes)->orderBy('fecha_inicio', 'asc')->get();
        } else {
            return response()->json(['message' => 'Valor de mes no válido'], 400);
        }

        return response()->json($eventos);
    }

    public function destroy(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['message' => 'Evento no encontrado'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }
}
