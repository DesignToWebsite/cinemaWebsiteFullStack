<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateUsersRequest extends FormRequest
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
        $methode = $this->method();
        if($methode == 'PUT'){
            return [
                'firstName' => ['required'],
                'lastName' => ['required'],
                'email'  => ['required', 'email', 
                            Rule::unique('users')->ignore(auth()->id())],
                'phone' => ['required'],
                'password' => ['required']
            ];
        }
        else{
            return [
                'firstName' => ['sometimes'],
                'lastName' => ['sometimes'],
                'email'  => ['sometimes', 'email', 
                            Rule::unique('users')->ignore(auth()->id())],
                'phone' => ['sometimes'],
                'password' => ['sometimes']
            ];
        }
        
    }
}
