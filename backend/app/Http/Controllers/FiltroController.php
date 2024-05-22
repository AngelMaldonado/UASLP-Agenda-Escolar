<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActualizaFiltroRequest;
use App\Http\Requests\NuevoFiltroRequest;
use App\Models\Filtro;
use App\Traits\RespuestasHttp;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class FiltroController extends Controller
{
    use RespuestasHttp;

    public function index(Request $request)//: \Illuminate\Http\JsonResponse
    {
        return Filtro::all();
    }

    public function store(NuevoFiltroRequest $request): \Illuminate\Contracts\Foundation\Application|\Illuminate\Contracts\Routing\ResponseFactory|\Illuminate\Foundation\Application|\Illuminate\Http\Response
    {
        $request->validated($request->all());

        $filtro = new Filtro($request->all());
        $filtro->icono = $request->file('icono')->store('/iconos/' . $request->input('categoria'));
        $filtro->save();

        return $this->exito($filtro, "Filtro guardado con éxito");
    }

    public function update(ActualizaFiltroRequest $request)
    {
        $request->validated($request->all());

        $filtro = Filtro::find($request->input('id'));
        $filtro->fill($request->only('nombre', 'categoria'));

        // Si se modificó el archivo del ícono
        if ($request->hasFile('icono')) {
            if (Storage::exists($filtro->icono))
                Storage::delete($filtro->icono);
            $filtro->icono = $request->file('icono')->store('/iconos/' . $request->input('categoria'));
        }

        $filtro->save();
        return $this->exito($filtro, 'Filtro actualizado con éxito');
    }

    public function destroy(Request $request)
    {
        $request->validate(['id' => 'required|exists:filtro,id']);

        $filtro = Filtro::find($request->input('id'));

        if (Storage::exists($filtro->icono))
            Storage::delete($filtro->icono);

        $filtro->delete();

        return $this->exito(null, "Filtro eliminado con éxito");
    }
}
