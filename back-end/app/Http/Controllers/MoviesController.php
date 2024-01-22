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
        return new MoviesCollection($movies->paginate(15)->appends($request->query()));

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
    public function update(UpdateMoviesRequest $request, $id)
    {
        $movies = Movies::findOrFail($id);
        // return $movies;
        $movies->update($request->all());
        $updatedMovie = Movies::findOrFail($id);
        return new MoviesResource($updatedMovie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $movie = Movies::find($id);
        if(!$movie){
            return response()->json(['error' => 'Movie not found'], 404);
        }


        $movie->delete();
        return response()->json(['message' => 'Movie deleted successfully']);
    
    }
}
