<?php

namespace App\Http\Controllers;

use App\Filters\UsersFilter;
use App\Http\Resources\UsersCollection;
use App\Http\Resources\UsersResource;
use App\Models\Users;
use App\Http\Requests\StoreUsersRequest;
use App\Http\Requests\UpdateUsersRequest;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function index(Request $request)
    {
        $filter = new UsersFilter();
        $filterItems = $filter->transform($request);
        
        $includeReservation = request()->query('includeReservations');
        
        $users = Users::where($filterItems);

        if($includeReservation){
            $users = $users->with('reservations.movies');
        }
        return new UsersCollection($users->paginate()->appends($request->query()));
    
    }
    
    
    public function create()
    {
        //
    }

    
    public function store(StoreUsersRequest $request)
    {
        return new UsersResource(Users::create($request->all()));
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        // return $users;
        $users = Users::findOrFail($id);
        $includeReservations = request()->query('includeReservations');
        if($includeReservations){
            $users = $users->loadMissing('reservations.movies');
        }
        
        return new UsersResource($users);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Users $users)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUsersRequest $request, $id)
    {
        $user = Users::findOrFail($id);
        $user->update($request->all());
        $updateUser = Users::findOrFail($id);
        return new UsersResource($updateUser);

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Users $users)
    {
        //
    }
}
