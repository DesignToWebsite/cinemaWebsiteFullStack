<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reservations;

class Users extends Model
{
    use HasFactory;
    
    public function reservations(){
        return $this->hasMany(Reservations::class);
    }

    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'phone',
        'password'
    ];
}
