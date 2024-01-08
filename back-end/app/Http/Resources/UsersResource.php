<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UsersResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */

    //  http://127.0.0.1:8000/api/users?includeReservations=true&id[eq]=22
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'firstName' =>$this->firstName,
            'lastName' => $this->lastName,
            'email'=>$this->email,
            'phone'=>$this->phone,
            'password'=>$this->password,
            'reservations'=>  ReservationsResource::collection($this->whenLoaded('reservations')),
            
        ];
    }
}
