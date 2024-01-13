<?php
namespace App\Enums;

enum TipoUsuarioEnum: string
{
    case ADMINISTRADOR = 'administrador';
    case SECUNDARIO = 'administrador secundario';
    case BECARIO = 'becario';
}
