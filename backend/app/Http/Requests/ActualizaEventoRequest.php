<?php

namespace App\Http\Requests;

use App\Enums\TipoEventoEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\File;

class ActualizaEventoRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id' => 'required|exists:evento,id',
            'tipo' => ['required', Rule::enum(TipoEventoEnum::class)],
            'cat_evento_id' => 'required_if:tipo,' . TipoEventoEnum::CATALOGO->value . '|exists:cat_evento,id',
            'usuario_id' => 'required|exists:usuario,id',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after_or_equal:fecha_inicio',
            'descripcion' => 'required|string|max:270',
            'nombre' => [
                'required_if:tipo,' . TipoEventoEnum::FACULTAD->value . ',' . TipoEventoEnum::ALUMNADO->value,
                'string', 'max:100'
            ],
            'simbolo_id' => [
                'required_if:tipo,' . TipoEventoEnum::FACULTAD->value,
                'exists:simbologia,id'
            ],
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
            'filtros' => [
                'required_if:tipo,' . TipoEventoEnum::FACULTAD->value . ',' . TipoEventoEnum::CATALOGO->value,
                'array'
            ],
            'filtros.*' => 'exists:filtro,id',
        ];
    }
}
