<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreMoviesRequest extends FormRequest
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
        'name'  => ['required', 'string'],
        'img' => ['required', 'string' ],
        'video' => ['required', 'string' ],
        'description' => ['required', 'string' ],
        'day' => ['required' ],
        'time' => ['required', 'date_format:H:i' ],
        'salle' => ['required' ],
        'actors' => ['required' ],
        'category' => ['required'],
        'star' => ['required' ],
        'year' => ['required', 'digits:4' ],
        'price' => ['required'],
        'placesRoom' => ['required' ],
        'top' => ['required', 'boolean'],
        'age' => ['required'],
        ];
    }
}
