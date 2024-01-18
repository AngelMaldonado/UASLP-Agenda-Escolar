<?php

namespace App\Models;

use App\Enums\TipoUsuarioEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'usuario';
    protected $fillable = ['nombre','apellido', 'tipo', 'email', 'permisos', 'rpe'];
    protected $casts = [
        'nombre' => 'string',
        'apellido' => 'string',
        'tipo' => TipoUsuarioEnum::class,
        'email' => 'string',
        'permisos' => 'array',
        'rpe' => 'integer'
    ];
    public $timestamps = false;

    /*
    public function eventos()
    {
        return $this->hasMany(Evento::class, 'usuario_id');
    }
    */
}
