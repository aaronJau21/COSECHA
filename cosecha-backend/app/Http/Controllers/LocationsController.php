<?php

namespace App\Http\Controllers;

use App\Http\Resources\LocationCollection;
use App\Models\Location;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function getLocations()
    {
        return new LocationCollection(Location::all());
    }
}
