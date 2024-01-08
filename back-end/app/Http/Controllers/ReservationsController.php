<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReservationsResource;
use App\Http\Resources\ReservationsCollection;
use App\Models\Reservations;
use App\Http\Requests\StoreReservationsRequest;
use App\Http\Requests\UpdateReservationsRequest;
use App\Filters\ReservationsFilter;
use Illuminate\Http\Request;

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
        return new ReservationsResource(Reservations::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    // public function show(Reservations $reservations)
    // {
    //     return new ReservationResource($reservations);
    // }
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

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Reservations $reservations)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateReservationsRequest $request, Reservations $reservations)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Reservations $reservations)
    {
        //
    }
}
