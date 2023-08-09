<?php

namespace App\Http\Controllers;

use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ServicesController extends Controller
{
    public function getServices()
    {
        $services = Service::all();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'List Services',
            'services' => $services
        ]);
    }
}
