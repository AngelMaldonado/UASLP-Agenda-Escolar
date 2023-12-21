<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Model
{
    use HasFactory, HasRoles;

    protected $table = 'usuario';
    protected $fillable = ['nombre','apellido' 'tipo', 'email', 'permisos', 'rpe'];
    protected $casts = ['permisos' => 'array'];
    public $timestamps = false;

    
    public function eventos()
    {
        return $this->hasMany(Event::class, 'usuario_id');
    }
}
