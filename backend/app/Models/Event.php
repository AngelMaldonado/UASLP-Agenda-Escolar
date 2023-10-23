<?php
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Event;

class EventController extends Controller
{
    public function showEventsByDay($fecha)
    {
        // Consulta la base de datos para obtener los eventos del día
        $events = Event::whereDate('fecha', $fecha)->get();

        return response()->json($events);
    }
}
