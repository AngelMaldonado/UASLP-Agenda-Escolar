<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;
class Event extends Model
{


    protected $table = 'evento'; // Referencia a la tabla en la base de datos

    use HasFactory;
    protected $fillable = [
        'cat_evento_id',
        'usuario_id',
        'nombre',
        'fecha_inicio',
        'fecha_fin',
        'hipervinculos',
        'imagen',
        'descripcion',
        'tipo',
    ];

    public $timestamps = false;

    protected $casts = [
        'hipervinculos' => 'array',
    ];

    // Relacion con la categoria de eventos
    public function category()
    {
        return $this->belongsTo(Event::class, 'cat_evento_id');
    }

    // Relación con el usuario
    public function usuario()
    {
        return $this->belongsTo(Event::class, 'usuario_id');
    }

    // Relación muchos a muchos con áreas
    public function areas()
    {
        return $this->belongsToMany(Event::class, 'evento_area', 'cat_evento_id', 'cat_area_id');
    }

     // Relación muchos a muchos con comunidades
     public function comunidades()
     {
         return $this->belongsToMany(Event::class, 'evento_comunidad', 'cat_evento_id', 'cat_comunidad_id');
     }
}
