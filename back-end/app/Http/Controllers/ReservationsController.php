<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationsResource;
use App\Http\Resources\ReservationsCollection;
use App\Models\Reservations;
use App\Http\Requests\StoreReservationsRequest;
use App\Http\Requests\UpdateReservationsRequest;
use App\Filters\ReservationsFilter;
use Illuminate\Http\Request;
use Stripe\Exception\CardException;
use Stripe\PaymentIntent;
use Stripe\Stripe;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Response;
use Stripe\Product as StripeProduct;
use Stripe\Price as StripePrice;
class ReservationsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        // return $request;users
        $filter = new ReservationsFilter();
        $filterItems = $filter->transform($request);

        $includeUsers = $request->query('includeUsers');
        $includeMovies = $request->query('includeMovies');

        $reservations = Reservations::where($filterItems);
        if($includeUsers){
            $reservations = $reservations->with('users');
            // return new ReservationsCollection($reservations->paginate()->appends($request->query()));
        }
        if($includeMovies){
            $reservations = $reservations->with('movies');
        }
        // return new ReservationsCollection($reservations->paginate()->appends($request->query()));
        return new ReservationsCollection($reservations->paginate()->appends($request->query()));
    
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */

     public function store(StoreReservationsRequest $request)
{
    try {
        // Start a database transaction
        DB::beginTransaction();

        // Create a new reservation
        $reservation = Reservations::create($request->all());

        // Load related data (users and movies)
        $reservation->load('users', 'movies');

        // Create a description based on whether food is included
        $description = "Movie reservation";
        if ($reservation->food !== null) {
            $description .= " with food: " . $reservation->food;
        }

        if ($reservation->seats !== null) {
            $description .= " | Seats: " . $reservation->seats;
        }

        // Initialize Stripe
        $stripe = new \Stripe\StripeClient(config('services.stripe.secret'));
        Stripe::setApiKey(config('services.stripe.secret'));

        // Create a product in Stripe
        $stripeProduct = $stripe->products->create([
            'name' => $reservation->movies->name,
            'description' => $description,
            'images' => [$reservation->movies->img],
        ]);

        // Create a price in Stripe
        $stripePrice = StripePrice::create([
            'product' => $stripeProduct->id,
            'unit_amount' => $reservation->price * 0.11 * 100, // Convert price to cents
            'currency' => 'usd', // Adjust currency as needed
        ]);

        // Create a payment link in Stripe
        $url = 'http://localhost:5173/profile/' . $stripePrice->id;
        $stripeLink = $stripe->paymentLinks->create([
            'line_items' => [
                [
                    'price' => $stripePrice->id,
                    'quantity' => 1,
                ],
            ],
            'after_completion' => [
                'redirect' => [
                    'url' => $url,
                ],
                'type' => 'redirect'
            ]
        ]);

        // Update the reservation with Stripe information
        $reservation->update([
            'stripe_id' => $stripePrice->id,
            'stripe_link' => $stripeLink->url,
        ]);

        // Commit the database transaction
        DB::commit();

        // Return the successful response
        return new ReservationsResource($reservation);
    } catch (\Exception $e) {
        // Roll back the database transaction in case of an error
        DB::rollBack();

        // Log the error for debugging
        \Log::error('Error in Stripe integration: ' . $e->getMessage());

        // Return an error response
        return response()->json(['error' => 'Error processing reservation. Please try again.'], Response::HTTP_INTERNAL_SERVER_ERROR);
    }
}


    
    public function show( $id)
    {
        $reservations = Reservations::findOrFail($id);
        $includesUser = request()->query('includeUsers');
        $includesMovies = request()->query('includeMovies');
        if($includesUser){
            $reservations = $reservations->loadMissing('users');
        }
        if($includesMovies){
            $reservations = $reservations->loadMissing('movies');
        }
        return new ReservationsResource($reservations);
    }

    
    public function edit(Reservations $reservations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationsRequest $request, $id)
    {
        $reservations = Reservations::findOrFail($id);
        // return $reservations;
        $reservations->update($request->all());
        $updatedReservation = Reservations::findOrFail($id);
        return new ReservationsResource($updatedReservation);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        //Find the reservation
        $reservation = Reservations::find($id);
        //check if the reservation exists
        if(!$reservation){
            return response()->json(['error' => 'Reservation not found'], 404);
        }


        $reservation->delete();
        return response()->json(['message' => 'Reservation deleted successfully']);
    }

}
