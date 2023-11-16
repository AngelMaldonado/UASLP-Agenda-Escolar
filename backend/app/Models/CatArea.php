<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;

class CatArea extends Model
{
    
    use HasFactory;

    protected $table = 'cat_area';
    protected $fillable = ['descripción'];

    
    public function eventos()
    {
        return $this->belongsToMany(Event::class, 'evento_area', 'cat_area_id', 'cat_evento_id');
    }
    
}
