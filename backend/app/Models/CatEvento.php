<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;

class CatEvento extends Model
{
    use HasFactory;
    protected $table = 'cat_evnto';
    protected $fillable = ['nombre', 'descripción', 'simbolo'];
    // Relación muchos a muchos con eventos
    public function eventos()
    {
        return $this->belongsToMany(Event::class, 'evento_cat_evento', 'cat_evento_id', 'evento_id');
    }

    public function areas()
    {
        return $this->belongsToMany(CatArea::class, 'evento_area', 'cat_evento_id', 'cat_area_id');
    }

    // Relación muchos a muchos con comunidades
    public function comunidades()
    {
        return $this->belongsToMany(CatComunidad::class, 'evento_comunidad', 'cat_evento_id', 'cat_comunidad_id');
    }
}
