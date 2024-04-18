<?php

namespace App\Http\Requests;

use App\Enums\FiltroCategoriaEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;
use Illuminate\Validation\Rule;

class ActualizaFiltroRequest extends FormRequest
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
            'id' => 'required|int|exists:filtro,id',
            'nombre' => 'required|max:60|unique:filtro,nombre',
            'icono' => [
                'required',
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !($value instanceof UploadedFile))
                        $fail('The '.$attribute.' must either be a string or file.');
                    else if ($value instanceof UploadedFile)
                        if($value->getClientOriginalExtension() !== 'svg')
                            $fail('El '. $attribute . ' debe ser un archivo .svg.');
                }
            ],
            'categoria' => [Rule::enum(FiltroCategoriaEnum::class)],
        ];
    }
}
