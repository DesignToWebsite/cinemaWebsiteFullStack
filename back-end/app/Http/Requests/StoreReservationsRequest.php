<?php

namespace App\Http\Requests;

use App\Rules\UniqueReservedSeats;
use Illuminate\Foundation\Http\FormRequest;

class StoreReservationsRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'userId'=> ['required', 'exists:users,id'],
            'movieId'=> ['required', 'exists:movies,id'],
            'placesReserved'=> ['required','integer', 'min:1'],
            'seats'=> ['required' , new UniqueReservedSeats($this->input('movieId'))],
            'price'=> ['required', 'numeric'],
            'paid' => ['boolean']
        ];
    }
    protected function prepareForValidation(){
        $this->merge([
            'users_id' => $this->userId,
            'movies_id' => $this->movieId
        ]);
    }
}
