<?php
namespace App\Models;

use App\Enums\TipoEventoEnum;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
class Evento extends Model
{
    use HasFactory;

    protected $table = 'evento';
    protected $fillable = [
        'cat_evento_id',
        'usuario_id',
        'simbolo_id',
        'nombre',
        'fecha_inicio',
        'fecha_fin',
        'hipervinculos',
        'imagen',
        'descripcion',
        'tipo',
    ];
    protected $casts = [
        'cat_evento_id' => 'integer',
        'usuario_id' => 'integer',
        'simbolo_id' => 'integer',
        'nombre' => 'string',
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date',
        'hipervinculos' => 'array',
        'imagen' => 'string',
        'descripcion' => 'string',
        'tipo' => TipoEventoEnum::class,
    ];
    public $timestamps = false;

    // Relación con catálogo de eventos
    public function cat_evento()
    {
        return $this->belongsTo(CatEvento::class, 'cat_evento_id');
    }

    // Relación con el usuario
    public function usuario()
    {
        return $this->belongsTo(Usuario::class, 'usuario_id');
    }

    // Relación muchos a muchos con áreas
    public function filtros()
    {
        return $this->belongsToMany(Filtro::class, 'eventos_filtros', 'evento_id', 'filtro_id');
    }

    public static function EventoDesdeCatalogo(int $cat_evento_id, Evento $evento): void
    {
        $cat_evento = CatEvento::find($cat_evento_id);
        // Atributos asignados por catálogo
        $evento->cat_evento_id = $cat_evento->id;
        $evento->nombre = $cat_evento->nombre;
        $evento->simbolo_id = $cat_evento->simbolo_id;
    }
}
