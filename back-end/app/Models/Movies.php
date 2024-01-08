<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reservations;

class Movies extends Model
{
    use HasFactory;

    public function reservations(){
        return $this->hasMany(Reservations::class);
    }

    protected $fillable = [
        'name' ,
        'img',
        'video',
        'description',
        'day',
        'time',
        'salle',
        'actors',
        'category',
        'star',
        'year',
        'price',
        'placesRoom',
        'top',
        'age',
    ];
}
