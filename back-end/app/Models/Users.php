<?php

namespace App\Models;
use Illuminate\Foundation\Auth\User as Authentication;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Reservations;
use Laravel\Cashier\Billable;

class Users extends Authentication
{
    use HasFactory;
    use Billable;
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
    protected $hidden = [
        'password', 'remember_token',
    ];
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];
}
