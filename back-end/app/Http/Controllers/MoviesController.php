<?php

namespace App\Http\Controllers;

use App\Filters\MoviesFilter;
use App\Http\Resources\MoviesCollection;
use App\Http\Resources\MoviesResource;
use App\Models\Movies;
use App\Http\Requests\StoreMoviesRequest;
use App\Http\Requests\UpdateMoviesRequest;
use Illuminate\Http\Request;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $filter = new MoviesFilter();
        $filterItems = $filter->transform($request);
        $incluedesReservations = $request->query('includeReservations');
        $movies = Movies::where($filterItems);
        if($incluedesReservations){
            $movies = $movies->with('reservations');
        }
        // if(count($filterItems) == 0){
        //     return new MoviesCollection(Movies::all());
        // }
        // else{
        //     return new MoviesCollection(Movies::where($filterItems)->paginate());
        // }
        return new MoviesCollection($movies->paginate()->appends($request->query()));

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
    public function store(StoreMoviesRequest $request)
    {
        return new MoviesResource(Movies::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $movies = Movies::findOrFail($id);
       
        $includeMovies = request()->query('includeReservations');
        if($includeMovies){
            return new MoviesResource($movies->loadMissing('reservations'));
        }
        return new MoviesResource($movies);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Movies $movies)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMoviesRequest $request, Movies $movies)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movies)
    {
        //
    }
}
