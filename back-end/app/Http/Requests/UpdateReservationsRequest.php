<?php

namespace App\Http\Requests;

use App\Rules\UniqueReservedSeats;
use Illuminate\Foundation\Http\FormRequest;

class UpdateReservationsRequest extends FormRequest
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
        $method = $this->method();
        if($method == 'PUT'){
            return [
                'userId'=> ['required', 'exists:users,id'],
                'movieId'=> ['required', 'exists:movies,id'],
                'placesReserved'=> ['required','integer', 'min:1'],
                'seats'=> ['required' , new UniqueReservedSeats($this->input('movieId'))],
                'price'=> ['required', 'numeric'],
                'paid' => ['boolean'],
                'food' => ['sometimes', 'nullable', 'string'],
                'stripeId'=> ['sometimes', 'nullable', 'string'],
                'stripeLink'=> ['sometimes', 'nullable', 'string'],
            ];
        }
        else{
            return [
                'userId'=> ['sometimes', 'exists:users,id'],
                'movieId'=> ['sometimes', 'exists:movies,id'],
                'placesReserved'=> ['sometimes','integer', 'min:1'],
                'seats'=> ['sometimes' , new UniqueReservedSeats($this->input('movieId'))],
                'price'=> ['sometimes', 'numeric'],
                'paid' => ['sometimes','boolean'],
                'food' => ['sometimes', 'nullable', 'string'],
                'stripeId'=> ['sometimes', 'string'],
                'stripeLink'=> ['sometimes', 'string'],
                
            ];
        }
        
    }
    protected function prepareForValidation(){
        $mergeFiels = [];
        // Check if the userId field is present in the request
        if ($this->has('userId')) {
            $mergeFields['users_id'] = $this->userId;
        }

        // Check if the movieId field is present in the request
        if ($this->has('movieId')) {
            $mergeFields['movies_id'] = $this->movieId;
        }

        if($this->has("stripeId")){
            $mergeFields['stripe_id'] = $this->stripeId;
        }
        if($this->has("stripeLink")){
            $mergeFields['stripe_link'] = $this->stripeLink;

        }
        if($this->has("paid")){
            $mergeFields['paid'] = $this->paid;
        }
        $this->merge($mergeFields);
    }
}
