<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    public function showEventsByDay($fecha)
    {
        // Consulta la base de datos para obtener los eventos del día
        $events = Event::whereDate('fecha', $fecha)->get();

        return response()->json($events);
    }
}
