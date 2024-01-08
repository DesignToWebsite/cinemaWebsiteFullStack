<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\UsersResource;
use App\Http\Resources\MoviesResource;
class ReservationsResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'userId'=>$this->users_id,
            'movieId'=>$this->movies_id,
            'placesReserved'=>$this->placesReserved,
            'seats'=>$this->seats,
            'price' => $this->price,
            'paid' => $this->paid,
            'users'=> new UsersResource($this->whenLoaded('users')),
            'movies' => new MoviesResource($this->whenLoaded('movies'))
        ];
    }
}
