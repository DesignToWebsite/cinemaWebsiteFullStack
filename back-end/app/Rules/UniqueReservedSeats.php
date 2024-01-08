<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\Rule;
use Illuminate\Contracts\Validation\ValidationRule;
use App\Models\Reservations;
use App\Models\Movies;
class UniqueReservedSeats implements Rule
{
    /**
     * Run the validation rule.
     *
     * @param  \Closure(string): \Illuminate\Translation\PotentiallyTranslatedString  $fail
     */

    protected $movieId;

    public function __construct($movieId)
    {
        $this->movieId = $movieId;
    }

    public function passes($attribute, $value)
    {
        // Check if any of the selected seats are already reserved for the specified movie
        $reservedSeats = Reservations::where('movies_id', $this->movieId)
            ->whereIn('seats', explode(',', $value))
            ->exists();

        if($reservedSeats){
            return false;
        }

        // Check if the selected seats are within the allowed range of placesRoom
        $movie = Movies::find($this->movieId);

        if (!$movie) {
            return false; // Handle the case where the movie is not found
        }

        $placesRoom = $movie->placesRoom;
        $selectedSeats = explode(',', $value);

        foreach ($selectedSeats as $seat) {
            if (!is_numeric($seat) || $seat < 1 || $seat > $placesRoom) {
                return false;
            }
        }


        return true;
    }

    public function message()
    {
        return 'Invalid seat selection. Please check the selected seats.';
    }
}
