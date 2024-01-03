<?php

namespace App\Http\Resources\V1;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class MoviesResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    /*** */
    public function toArray(Request $request): array
    {
        return [
            'id'=>$this->id,
            'name'=>$this->name,
            'video'=>$this->video,
            'description'=>$this->description,
            'img'=>$this->image,
            'salle'=>$this->salle,
            'price'=>$this->price,
            'day'=>$this->day,
            'time'=>$this->time,
            'actors'=>$this->actors,
            'star'=>$this->star,
            'top'=>$this->top,
            'age'=>$this->age
        ];
    }
}
