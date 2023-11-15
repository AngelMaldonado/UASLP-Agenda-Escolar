<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Databas\Eloquent\Relations\BelongsToMany;

class CatArea extends Model
{
    use HasFactory;
    public function eventos()
    {
        return $this->belongsToMany(Event::class, 'evento_area', 'cat_area_id', 'cat_evento_id');
    }
    
}
