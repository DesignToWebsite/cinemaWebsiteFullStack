<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use App\Http\Resources\ReservationsResource;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' =>$this->id,
            'name' => $this->name,
            'img'=>$this->img,
            'video' => $this->video,
            'description' => $this->description,
            'day'=> $this->day,
            'time'=> $this->time,
            'salle' => $this->salle,
            'actors' => $this->actors,
            'category' =>  $this->category,
            'star' => $this->star,
            'year'=>$this->year,
            'price'=>$this->price,
            'placesRoom'=>$this->placesRoom,
            'top'=>$this->top,
            'age'=>$this->age,
            'reservations'=>ReservationsResource::collection($this->whenLoaded('reservations'))
        ];
    }
}
