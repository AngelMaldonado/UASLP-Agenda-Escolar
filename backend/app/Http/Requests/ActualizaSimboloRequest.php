<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\UploadedFile;

class ActualizaSimboloRequest extends FormRequest
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
            'id' => 'required|exists:simbologia,id',
            'simbolo' => [
                function ($attribute, $value, $fail) {
                    if (!is_string($value) && !($value instanceof UploadedFile))
                        $fail('The '.$attribute.' must either be a string or file.');
                    else if ($value instanceof UploadedFile)
                        if($value->getClientOriginalExtension() !== 'webp')
                            $fail('El '. $attribute . ' debe ser un archivo .webp.');
                }
            ],
        ];
    }
}
