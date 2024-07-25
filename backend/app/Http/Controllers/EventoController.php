<?php

namespace App\Http\Controllers;

use App\Enums\TipoEventoEnum;
use App\Http\Requests\ActualizaEventoRequest;
use App\Http\Requests\NuevoEventoRequest;
use App\Models\Simbologia;
use App\Traits\RespuestasHttp;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Models\Evento;

class EventoController extends Controller
{
    use RespuestasHttp;

    public function index(Request $request): \Illuminate\Database\Eloquent\Collection
    {
        $eventos = Evento::all();

        /* Cuando se consulte para agenda y calendario agregar a los eventos 'simbolo' para poder mostrar el símbolo */
        /* Agregar también 'filtros' */
        foreach ($eventos as $evento) {
            if ($evento->tipo !== TipoEventoEnum::ALUMNADO) {
                $evento->simbolo = Simbologia::find($evento->simbolo_id)->simbolo;
                $evento->filtros = $evento->filtros()->allRelatedIds();
            }
            if ($evento->imagen === null)
                unset($evento->imagen);
        }

        return $eventos;
    }

    public function store(NuevoEventoRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validated($request->all());

        $evento = new Evento($request->only(['tipo', 'usuario_id', 'fecha_inicio', 'fecha_fin', 'descripcion']));

        // Evento de catálogo
        $this->atributosSegunTipo($evento, $request);

        if ($request->hasFile('imagen'))
            $evento->imagen = $request->file('imagen')->store('/imagenes/eventos');

        // Guarda el evento en la bd
        $evento->save();

        // Asigna los filtros proporcionados
        if ($evento->tipo !== TipoEventoEnum::ALUMNADO && $request->has('filtros'))
            foreach ($request->input('filtros') as $id)
                $evento->filtros()->attach($id);

        return $this->exito($evento, 'Evento guardado con éxito');
    }

    // Actualizar un evento existente
    public function update(ActualizaEventoRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validated($request->all());

        $evento = Evento::find($request->input('id'));
        $evento->fill($request->only('tipo', 'usuario_id', 'fecha_inicio', 'fecha_fin', 'descripcion'));

        // Eventos de catálogo
        $this->atributosSegunTipo($evento, $request);

        // Si ya había imagen antes, eliminarla
        if ($evento->imagen !== NULL &&
            Storage::exists($evento->imagen) &&
            ($request->hasFile('imagen') || $request->input('eliminar_imagen'))
        ) {
            Storage::delete($evento->imagen);
            $evento->imagen = null;
        }

        // Guardar la nueva imagen si la hay
        if ($request->hasFile('imagen'))
            $evento->imagen = $request->file('imagen')->store('/imagenes/eventos');

        if ($evento->tipo !== TipoEventoEnum::ALUMNADO && $request->has('filtros'))
            $evento->filtros()->sync($request->input('filtros'));

        $evento->update();

        return $this->exito($evento, 'Evento actualizado con éxito');
    }

    // Eliminar un evento
    public function destroy(Request $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validate(['id' => 'required|exists:evento,id']);

        $evento = Evento::find($request->input('id'));

        if ($evento->imagen !== null)
            if (Storage::exists($evento->imagen))
                Storage::delete($evento->imagen);

        $evento->delete();

        return $this->exito(null, "Evento eliminado con éxito");
    }

    public function atributosSegunTipo($evento, Request $request): void
    {
        if ($evento->tipo === TipoEventoEnum::CATALOGO)
            Evento::EventoDesdeCatalogo($request->input('cat_evento_id'), $evento);
        // Eventos de agenda-calendario o estudiantes
        else if ($evento->tipo === TipoEventoEnum::FACULTAD || $evento->tipo === TipoEventoEnum::ALUMNADO) {
            $evento->nombre = $request->input('nombre');
            if ($request->input('tipo') === TipoEventoEnum::FACULTAD->value)
                $evento->simbolo_id = $request->input('simbolo_id');
        }

        // Atributos opcionales (hipervinculos, imagen, filtros)
        if ($request->has('hipervinculos'))
            $evento->hipervinculos = $request->input('hipervinculos');
        else
            $evento->hipervinculos = [];
    }
}
