<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Spatie\Permission\Traits\HasRoles;

class Usuario extends Model
{
    use HasFactory;
    protected $table = 'usuario';
    protected $fillable = ['nombre', 'tipo', 'email', 'permisos'];
    protected $casts = ['permisos' => 'array'];
    public $timestamps = false;
    use HasRoles;
}
