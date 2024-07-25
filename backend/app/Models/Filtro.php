<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Enums\FiltroCategoriaEnum;

class Filtro extends Model
{
    use HasFactory;
    protected $table = 'filtro';
    protected $fillable = ['nombre', 'icono', 'categoria'];
    protected $casts = ['categoria' => FiltroCategoriaEnum::class];
    public $timestamps = false;
}
