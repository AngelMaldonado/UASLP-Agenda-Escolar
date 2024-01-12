<?php

namespace App\Http\Controllers;

use App\Models\Simbologia;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rules\File;
use Illuminate\Support\Facades\Validator;

class SimbologiaController extends Controller
{
    public function index(): \Illuminate\Http\JsonResponse
    {
        return(response()->json(Simbologia::all()));
    }

    public function store(Request $request): \Illuminate\Http\JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'simbolo' => ['required', File::types('webp')]
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $simbologia = new Simbologia();
        $simbologia->simbolo = $request->file('simbolo')->store('/imagenes/simbolos');
        $simbologia->save();

        return response()->json($simbologia, 200);
    }

    public function update(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'id' => 'required|int|exists:simbologia,id',
            'simbolo' => [
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !($value instanceof UploadedFile))
                        $fail('The '.$attribute.' must either be a string or file.');
                    else if ($value instanceof UploadedFile)
                        if($value->getClientOriginalExtension() !== 'webp')
                            $fail('El '. $attribute . ' debe ser un archivo .webp.');
                }
            ],
        ]);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $simbologia = Simbologia::find($request->input('id'));

        if ($simbologia !== null)
        {
            if (Storage::exists($simbologia->simbolo))
                Storage::delete($simbologia->simbolo);
            $simbologia->simbolo = $request->file('simbolo')->store('/imagenes/simbolos');
            $simbologia->save();
        }

        else return response()->json(['errors' => 'No se encontró el filtro'], 400);
        return response()->json($simbologia, 200);
    }

    public function destroy(Request $request)
    {
        $validator = Validator::make($request->all(), ['id' => 'required|int|exists:simbologia,id']);

        if ($validator->fails())
            return response()->json(['errors' => $validator->errors(), 400]);

        $filtro = Simbologia::find($request->input('id'));
        if (Storage::exists($filtro->simbolo))
            Storage::delete($filtro->simbolo);
        $filtro->delete();

        return response()->json(['message' => 'Símbolo eliminado'], 200);
    }
}
