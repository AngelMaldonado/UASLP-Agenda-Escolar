<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActualizaSimboloRequest;
use App\Http\Requests\NuevoSimboloRequest;
use App\Models\Simbologia;
use App\Traits\RespuestasHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SimbologiaController extends Controller
{
    use RespuestasHttp;

    public function index(): \Illuminate\Database\Eloquent\Collection
    {
        return Simbologia::all();
    }

    public function store(NuevoSimboloRequest $request): \Illuminate\Http\JsonResponse
    {
        $request->validated($request->all());

        $simbologia = new Simbologia();
        $simbologia->simbolo = $request->file('simbolo')->store('/imagenes/simbolos');
        $simbologia->save();

        return $this->exito($simbologia, 'Símbolo guardado con éxito');
    }

    public function update(ActualizaSimboloRequest $request)
    {
        $request->validated($request->all());

        $simbologia = Simbologia::find($request->input('id'));

        if (Storage::exists($simbologia->simbolo))
            Storage::delete($simbologia->simbolo);

        $simbologia->simbolo = $request->file('simbolo')->store('/imagenes/simbolos');
        $simbologia->save();

        return $this->exito($simbologia, 'Símbolo actualizado con éxito');
    }

    public function destroy(Request $request)
    {
        $request->validate(['id' => 'required|exists:simbologia,id']);

        $simbolo = Simbologia::find($request->input('id'));

        if (Storage::exists($simbolo->simbolo))
            Storage::delete($simbolo->simbolo);

        $simbolo->delete();

        return $this->exito(null, 'Símbolo eliminado con éxito');
    }
}
