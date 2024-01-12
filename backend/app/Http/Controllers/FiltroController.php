<?php

namespace App\Http\Controllers;

use App\Enums\FiltroCategoriaEnum;
use App\Models\Filtro;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;
use Illuminate\Validation\ValidationException;

class FiltroController extends Controller
{
    public function index(Request $request)//: \Illuminate\Http\JsonResponse
    {
        return response()->json(Filtro::all());
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'nombre' => 'required|max:60|unique:filtro,nombre',
            'icono' => ['required', File::types(['svg'])],
            'categoria' => [Rule::enum(FiltroCategoriaEnum::class)],
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $filtro = new Filtro($request->all());
        $filtro->icono = $request->file('icono')->store('/iconos/' . $request->input('categoria'));
        $filtro->save();

        return response()->json($filtro, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|int|exists:filtro,id',
            'nombre' => 'required|max:60',
            'icono' => [
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !($value instanceof UploadedFile))
                        $fail('The '.$attribute.' must either be a string or file.');
                    else if ($value instanceof UploadedFile)
                        if($value->getClientOriginalExtension() !== 'svg')
                            $fail('El '. $attribute . ' debe ser un archivo .svg.');
                }
            ],
            'categoria' => [Rule::enum(FiltroCategoriaEnum::class)],
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $filtro = Filtro::find($request->input('id'));

        // Si se modificó el nombre y ya existe en la tabla de filtro arrojar un error
        if ($request->input('nombre') !== $filtro->nombre &&
            $validator->validateExists('nombre', $request->input('nombre'), ['filtro']))
            return response()->json(['errors' => 'El nombre ' . $request->input('nombre') . ' ya existe']);

        if ($filtro !== null)
        {
            // Si se modificó el archivo del ícono
            if ($request->hasFile('icono')) {
                if (Storage::exists($filtro->icono))
                    Storage::delete($filtro->icono);
                $filtro->icono = $request->file('icono')->store('/iconos/' . $request->input('categoria'));
            }

            $filtro->nombre = $request->input('nombre');
            $filtro->categoria = $request->input('categoria');
            $filtro->save();
        }
        else return response()->json(['errors' => 'No se encontró el filtro'], 400);
        return response()->json($filtro, 200);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), ['id' => 'required|int|exists:filtro,id']);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $filtro = Filtro::find($request->input('id'));
        if (Storage::exists($filtro->icono))
            Storage::delete($filtro->icono);
        $filtro->delete();

        return response()->json(['message' => 'Filtro eliminado'], 200);
    }
}
