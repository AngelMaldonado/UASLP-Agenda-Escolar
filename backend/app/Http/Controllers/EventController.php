<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Event;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Validator;


class EventController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'nombre' => 'required|max:100', // El campo 'nombre' es obligatorio y no debe exceder los 100 caracteres.
            'cat_evento_id' => 'required|exists:cat_evento,id', // El campo 'cat_evento_id' es obligatorio y debe existir en la tabla 'cat_evento'.
            'usuario_id' => 'required|exists:usuario,id', // El campo 'usuario_id' es obligatorio y debe existir en la tabla 'usuario'.
            'nombre' => 'required|max:100', // El campo 'nombre' es obligatorio y no debe exceder los 100 caracteres.
            'fecha_inicio' => 'required|date', // El campo 'fecha_inicio' es obligatorio y debe ser una fecha válida.
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio', // El campo 'fecha_fin' es obligatorio, debe ser una fecha válida y debe ser posterior o igual a 'fecha_inicio'.
            'hipervinculos' => 'json', // Asegúrate de que los datos se manejen adecuadamente como JSON.
            'imagen' => 'required|string|max:200', // El campo 'imagen' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 200 caracteres.
            'descripcion' => 'required|string|max:250', // El campo 'descripcion' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 250 caracteres.
            'tipo' => 'required|string|max:10', // El campo 'tipo' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 10 caracteres.
        ]);

        $event = Event::create($request->all());

        return response()->json($event);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|max:100', // El campo 'nombre' es obligatorio y no debe exceder los 100 caracteres.
            'cat_evento_id' => 'required|exists:cat_evento,id', // El campo 'cat_evento_id' es obligatorio y debe existir en la tabla 'cat_evento'.
            'usuario_id' => 'required|exists:usuario,id', // El campo 'usuario_id' es obligatorio y debe existir en la tabla 'usuario'.
            'nombre' => 'required|max:100', // El campo 'nombre' es obligatorio y no debe exceder los 100 caracteres.
            'fecha_inicio' => 'required|date', // El campo 'fecha_inicio' es obligatorio y debe ser una fecha válida.
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio', // El campo 'fecha_fin' es obligatorio, debe ser una fecha válida y debe ser posterior o igual a 'fecha_inicio'.
            'hipervinculos' => 'json', // Asegúrate de que los datos se manejen adecuadamente como JSON.
            'imagen' => 'required|string|max:200', // El campo 'imagen' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 200 caracteres.
            'descripcion' => 'required|string|max:250', // El campo 'descripcion' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 250 caracteres.
            'tipo' => 'required|string|max:10', // El campo 'tipo' es obligatorio, debe ser una cadena de caracteres y no debe exceder los 10 caracteres.
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
