<?php

namespace App\Http\Controllers;

use App\Enums\TipoEventoEnum;
use App\Models\Simbologia;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Illuminate\Http\Request;
use App\Models\Evento;
use Illuminate\Support\Facades\Validator;
use App\Models\CatEvento;
use Illuminate\Validation\Rule;

class EventoController extends Controller
{
    // Obtener eventos para un mes específico o todos los meses
    public function index(Request $request)
    {
        $eventos = Evento::all();

        /* Cuando se consulte para agenda y calendario agregar al json 'simbolo' para poder mostrar el símbolo */
        /* Agregar también 'filtros' */
        foreach ($eventos as $evento) {
            if ($evento->tipo !== TipoEventoEnum::ALUMNADO) {
                $evento->simbolo = Simbologia::find($evento->simbolo_id)->simbolo;
                $evento->filtros = $evento->filtros()->allRelatedIds();
            }
            if ($evento->imagen === null)
                unset($evento->imagen);
        }

        return response()->json($eventos);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tipo' => ['required', Rule::enum(TipoEventoEnum::class)],
            'cat_evento_id' => 'exists:cat_evento,id',
            'usuario_id' => 'required|exists:usuario,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'descripcion' => 'required|string|max:270',
            'nombre' => 'string|max:100',
            'simbolo_id' => 'exists:simbologia,id',
            'imagen' => [File::types('webp')],
            'hipervinculos' => 'array|max:5',
            'hipervinculos.*' => 'url',
            'filtros' => 'array',
            'filtros.*' => 'exists:filtro,id',
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);

        $evento = new Evento();
        // Eventos de catálogo
        if ($request->has('cat_evento_id')) {
            $cat_evento = CatEvento::find($request->input('cat_evento_id'));
            $evento->tipo = TipoEventoEnum::CATALOGO;
            // Atributos asignados por catálogo
            $evento->cat_evento_id = $cat_evento->id;
            $evento->nombre = $cat_evento->nombre;
            $evento->simbolo_id = $cat_evento->simbolo_id;
            // Eventos de agenda-calendario o estudiantes
        } else if ($request->input('tipo') == TipoEventoEnum::FACULTAD->value ||
            $request->input('tipo') == TipoEventoEnum::ALUMNADO->value) {
            if ($request->input('tipo') === TipoEventoEnum::FACULTAD->value && !$request->has('simbolo_id'))
                return response()->json(['errors' => ['No se proporcionó la simbología']]);
            if (!$request->has('nombre'))
                return response()->json(['errors' => ['No se proporcionó ningún nombre']]);
            $evento->tipo = $request->input('tipo');
            $evento->nombre = $request->input('nombre');
            if ($request->input('tipo') === TipoEventoEnum::FACULTAD->value)
                $evento->simbolo_id = $request->input('simbolo_id');
        } else
            return response()->json(['errors' => ['Tipo de evento inválido']], 400);

        // Atributos asignados por el usuario
        $evento->usuario_id = $request->input('usuario_id');
        $evento->fecha_inicio = $request->input('fecha_inicio');
        $evento->fecha_fin = $request->input('fecha_fin');
        $evento->descripcion = $request->input('descripcion');

        // Atributos opcionales (hipervinculos, imagen, filtros)
        if ($request->has('hipervinculos'))
            $evento->hipervinculos = $request->input('hipervinculos');
        else
            $evento->hipervinculos = [];
        if ($request->hasFile('imagen'))
            $evento->imagen = $request->file('imagen')->store('/imagenes/eventos');

        $evento->save();

        if ($request->has('filtros'))
            foreach ($request->input('filtros') as $id)
                $evento->filtros()->attach($id);

        return response()->json($evento);
    }

    // Actualizar un evento existente
    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|exists:evento,id',
            'tipo' => ['required', Rule::enum(TipoEventoEnum::class)],
            'cat_evento_id' => 'exists:cat_evento,id',
            'usuario_id' => 'required|exists:usuario,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'descripcion' => 'required|string|max:270',
            'nombre' => 'string|max:100',
            'simbolo_id' => 'exists:simbologia,id',
            'imagen' => [
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !($value instanceof UploadedFile))
                        $fail('The '.$attribute.' must either be a string or file.');
                    else if ($value instanceof UploadedFile)
                        if($value->getClientOriginalExtension() !== 'webp')
                            $fail('El '. $attribute . ' debe ser un archivo .webp.');
                }
            ],
            'hipervinculos' => 'array|max:5',
            'hipervinculos.*' => 'url',
            'filtros' => 'required|array',
            'filtros.*' => 'exists:filtro,id',
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors()], 400);

        $evento = Evento::find($request->input('id'));

        if (!$evento)
            return response()->json(['errors' => 'Evento no encontrado'], 400);

        // Eventos de catálogo
        if ($request->input('tipo') === TipoEventoEnum::CATALOGO->value) {
            if (!$request->has('cat_evento_id'))
                return response()->json(['errors' => 'No se proporcionó evento del catálogo']);
            $cat_evento = CatEvento::find($request->input('cat_evento_id'));
            $evento->tipo = TipoEventoEnum::CATALOGO;
            // Atributos asignados por catálogo
            $evento->cat_evento_id = $cat_evento->id;
            $evento->nombre = $cat_evento->nombre;
            $evento->simbolo_id = $cat_evento->simbolo_id;
        } else if ($request->input('tipo') == TipoEventoEnum::FACULTAD->value ||
            $request->input('tipo') == TipoEventoEnum::ALUMNADO->value) {
            if (!$request->has('simbolo_id'))
                return response()->json(['errors' => ['No se proporcionó la simbología']]);
            if (!$request->has('nombre'))
                return response()->json(['errors' => ['No se proporcionó ningún nombre']]);
            $evento->tipo = $request->input('tipo');
            $evento->nombre = $request->input('nombre');
            $evento->simbolo_id = $request->input('simbolo_id');
        } else
            return response()->json(['errors' => ['Tipo de evento inválido']], 400);

        // Atributos asignados por el usuario
        $evento->usuario_id = $request->input('usuario_id');
        $evento->fecha_inicio = $request->input('fecha_inicio');
        $evento->fecha_fin = $request->input('fecha_fin');
        $evento->descripcion = $request->input('descripcion');

        // Atributos opcionales (hipervinculos, imagen, filtros)
        if ($request->has('hipervinculos'))
            $evento->hipervinculos = $request->input('hipervinculos');
        else
            $evento->hipervinculos = [];

        // Si ya había imagen antes, eliminarla
        if ($evento->imagen !== NULL && Storage::exists($evento->imagen)) {
            Storage::delete($evento->imagen);
            $evento->imagen = null;
        }

        // Guardar la nueva imagen si la hay
        if ($request->hasFile('imagen')) {
            $evento->imagen = $request->file('imagen')->store('/imagenes/eventos');
        }

        if ($request->has('filtros'))
            $evento->filtros()->sync($request->input('filtros'));

        $evento->update();

        return response()->json($evento);
    }

    // Eliminar un evento
    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), ['id' => 'required|int|exists:evento,id']);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $evento = Evento::find($request->input('id'));

        if ($evento->imagen !== null)
            if (Storage::exists($evento->imagen))
                Storage::delete($evento->imagen);

        $evento->delete();

        return response()->json(['message' => 'Evento eliminado con éxito'], 200);
    }
}
