<?php
namespace App\Enums;

enum TipoUsuarioEnum: string
{
    case ADMINISTRADOR = 'Administrador';
    case SECUNDARIO = 'Administrador Secundario';
    case BECARIO = 'Becario';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
