<?php

namespace App\Http\Controllers\Api\V1;

use App\Http\Resources\V1\MoviesResource;
use App\Models\Movies;
use App\Http\Requests\V1\StoreMoviesRequest;
use App\Http\Requests\V1\UpdateMoviesRequest;
use App\Http\Resources\V1\MoviesCollection;
use App\Http\Controllers\Controller;
use App\Models\User;

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Movies::all();
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
        //
    }

    
    public function show($id)
    {
        $movie = Movies::find($id);
    
        if (!$movie) {
            return response()->json(['error' => 'Movie not found'], 404);
        }
    
        return new MoviesResource($movie);
    }

    // public function(Movies $mic)
    
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
