<?php

namespace App\Http\Controllers;

use App\Http\Resources\ServicesCollection;
use App\Models\Service;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function getServices()
    {
        return new ServicesCollection(Service::all());
    }
}
