<?php

namespace App\Http\Controllers;

use App\Models\Location;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LocationsController extends Controller
{
    public function getLocations()
    {
        $locations = Location::all();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'List locations',
            'locations' => $locations
        ]);
    }
}
