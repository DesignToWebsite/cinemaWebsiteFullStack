<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Users;
use App\Models\Movies;

class Reservations extends Model
{
    use HasFactory;
    public function users(){
        return $this->belongsTo(Users::class);
    }

    public function movies(){
        return $this->belongsTo(Movies::class);
    }
    protected $fillable = [
        'users_id',
        'movies_id',
        'placesReserved',
        'seats',
        'price',
    ];
    
}
