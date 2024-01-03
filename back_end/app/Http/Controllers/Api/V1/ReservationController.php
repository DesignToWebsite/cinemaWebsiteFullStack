<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\ReservationResource;
use App\Models\Reservation;
use App\Http\Requests\V1\StoreReservationRequest;
use App\Http\Requests\V1\UpdateReservationRequest;
use App\Http\Controllers\Controller;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Reservation::all();
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
    public function store(StoreReservationRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    // public function show(Reservation $reservation)
    // {
    //     return $reservation;
    // }
    public function show($id)
    {
        $movie = Reservation::find($id);
    
        if (!$movie) {
            return response()->json(['error' => 'reservation not found'], 404);
        }
    
        return new ReservationResource($movie);
    }
    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservation $reservation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationRequest $request, Reservation $reservation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservation $reservation)
    {
        //
    }
}
