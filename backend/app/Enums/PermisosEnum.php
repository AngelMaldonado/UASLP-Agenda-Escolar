<?php
namespace App\Enums;

enum PermisosEnum: string
{
    // Permisos de creación
    case CREAR_EVENTO = 'Crear Evento';
    case CREAR_USUARIO = 'Crear Usuario';
    case CREAR_FILTRO = 'Crear Filtro';
    case CREAR_SIMBOLO = 'Crear Símbolo';

    // Permisos de modificación
    case MODIFICAR_EVENTO = 'Modificar Evento';
    case MODIFICAR_USUARIO = 'Modificar Usuario';
    case MODIFICAR_FILTRO = 'Modificar Filtro';
    case MODIFICAR_SIMBOLO = 'Modificar Símbolo';

    // Permisos de eliminación
    case ELIMINAR_EVENTO = 'Eliminar Evento';
    case ELIMINAR_USUARIO = 'Eliminar Usuario';
    case ELIMINAR_FILTRO = 'Eliminar Filtro';
    case ELIMINAR_SIMBOLO = 'Eliminar Símbolo';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}
