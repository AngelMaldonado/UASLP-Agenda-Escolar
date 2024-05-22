<?php

namespace App\Http\Requests;

use App\Enums\PermisosEnum;
use App\Enums\TipoUsuarioEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class ActualizaUsuarioRequest extends FormRequest
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
            'id' => 'required|exists:usuario,id',
            'tipo' => ['required', Rule::enum(TipoUsuarioEnum::class)],
            'permisos' => 'required|array',
            'permisos.*' => [Rule::in(PermisosEnum::values())],
            'nombre' => 'required_if:tipo,' . TipoUsuarioEnum::BECARIO->value . '|string|max:50',
            'apellido' => 'required_if:tipo,' . TipoUsuarioEnum::BECARIO->value . '|string|max:50',
            'email' => 'required_if:tipo,' . TipoUsuarioEnum::BECARIO->value . '|email',
            utf8_encode('contraseña') => 'required_if:tipo,' . TipoUsuarioEnum::BECARIO->value . '|string|max:60|min:6|confirmed',
            'rpe' => 'required_if:tipo,' . TipoUsuarioEnum::SECUNDARIO->value . '|digits:6|unique:usuario,rpe'
        ];
    }
}
