<?php

namespace App\Http\Requests;

use App\Enums\TipoUsuarioEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class LoginRequest extends FormRequest
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
            'tipo' => ['required', Rule::enum(TipoUsuarioEnum::class)],
            utf8_encode('contraseña') => 'required|string|max:60|min:6',
            'email' => [
                'required_if:tipo,' . TipoUsuarioEnum::ADMINISTRADOR->value . ',' . TipoUsuarioEnum::BECARIO->value,
                'email',
                'exists:usuario,email'
            ],
            'rpe' => [
                'required_if:tipo,' . TipoUsuarioEnum::SECUNDARIO->value,
                'digits:6',
                'exists:usuario,rpe'
            ]
        ];
    }
}
