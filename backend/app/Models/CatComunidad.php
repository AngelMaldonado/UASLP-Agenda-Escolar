<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;

class CatComunidad extends Model
{
    use HasFactory;

    protected $table = 'cat_comunidad';
    protected $fillable = ['descripcion', 'icono'];
    public $timestamps = false;

    public function eventos()
    {
        return $this->belongsToMany(Event::class, 'evento_comunidad', 'cat_comunidad_id', 'evento_id');
    }
}
