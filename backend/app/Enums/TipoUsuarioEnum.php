<?php
namespace App\Enums;

enum TipoUsuarioEnum: string
{
    case ADMINISTRADOR = 'administrador';
    case SECUNDARIO = 'secundario';
    case BECARIO = 'becario';
}
