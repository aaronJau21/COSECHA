<?php

namespace App\Http\Controllers;

use App\Models\Area;
use App\Models\Client;
use App\Models\Location;
use App\Models\Service;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ClientController extends Controller
{
    public function createClient(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:10',
            'phone' => 'required|unique:clients,phone',
            'email' => 'required|unique:clients,email|email|min:10',
            'location_id' => 'required',
            'service_id' => 'required',
            'area_id' => 'required'
        ]);
        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'msg' => 'Missing Data',
                'errors' => $validator->errors()
            ], 400);
        }
        $input = $request->input('phone');

        $caracteres_especiales = array('@', '#', '$', '%', '&', '¡', '!', '¿', '?', '(', ')', '+', '-', '/');

        $input_sin_especiales = str_replace($caracteres_especiales, '', $input);

        $client = Client::create([
            'name' => $request->name,
            'phone' => $input_sin_especiales,
            'info' => $request->info,
            'email' => $request->email,
            'business_name' => $request->business_name,
            'location_id' => $request->location_id,
            'service_id' => $request->service_id,
            'area_id' => $request->area_id,
        ]);



        return new JsonResponse([
            'status' => 200,
            'msg' => 'Created User Successful',
            'client' => $client,
        ]);
    }

    public function getClients()
    {
        $clients = Client::all();
        foreach ($clients as $client) {
            $service = Service::find($client->service_id);
            $local = Location::find($client->location_id);
            $area = Area::find($client->area_id);
            $client->service_id = $service ? $service->name : null;
            $client->location_id = $local ? $local->name : null;
            $client->area_id = $area ? $area->name : null;
        }

        return new JsonResponse([
            'status' => 200,
            'msg' => 'List Clients',
            'clients' => $clients,
        ]);
    }

    public function getClientById($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No exists Client'
            ], 404);
        }

        // Fetch related data
        $service = Service::find($client->service_id);
        $local = Location::find($client->location_id);
        $area = Area::find($client->area_id);

        // Update client attributes with related data
        $client->service_id = $service ? $service->name : null;
        $client->location_id = $local ? $local->name : null;
        $client->area_id = $area ? $area->name : null;

        return new JsonResponse([
            'status' => 200,
            // 'client' => $client,
            'client' => [
                'name' => $client->name,
                'phone' => $client->phone,
                'info' => $client->info,
                'email' => $client->email,
                'business_name' => $client->business_name,
                'location_name' => $client->location_id,
                'location_id' => $local->id,
                'service_name' => $client->service_id,
                'service_id' => $service->id,
                'area_name' => $client->area_id,
                'area_id' => $area->id
            ]
        ], 200);
    }

    public function updateClient(Request $request, $id)
    {
        $client = Client::find($id);

        if (!$client) {
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No exists Client'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'min:10',
            'phone' => 'unique:clients,phone,' . $id,
            'email' => 'unique:clients,email,' . $id,
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'msg' => 'Validation Error',
                'errors' => $validator->errors()
            ], 400);
        }

        $client->update([
            'name' => $request->name,
            'phone' => $request->phone,
            'info' => $request->info,
            'email' => $request->email,
            'business_name' => $request->business_name,
            'location_id' => $request->location_id,
            'service_id' => $request->service_id,
            'area_id' => $request->area_id
        ]);

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Updated Client Successful',
            'client' => $client
        ]);
    }

    public function delete($id)
    {
        $client = Client::find($id);

        if (!$client) {
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No exists Client'
            ], 404);
        }

        $client->delete();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Client Delete',
            'client' => $client
        ]);
    }

    public function sharedAreas(Request $request)
    {
        $searchQuery = $request->input('area');

        $areas = Area::where('name', 'LIKE', '%' . $searchQuery . '%')->get();
        $areasId = $areas->pluck('id');

        $clientsArea = Client::whereIn('area_id', $areasId)->get();
        foreach ($clientsArea as $client) {
            $service = Service::find($client->service_id);
            $local = Location::find($client->location_id);
            $area = Area::find($client->area_id);
            $client->service_id = $service ? $service->name : null;
            $client->location_id = $local ? $local->name : null;
            $client->area_id = $area ? $area->name : null;
        }

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Search results',
            'clients' => $clientsArea
        ]);
    }

    public function sharedServices(Request $request)
    {
        $searchQuery = $request->input('service');

        $service = Service::where('name', 'LIKE', '%' . $searchQuery . '%')->get();
        $serviceId = $service->pluck('id');

        $clientService = Client::whereIn('service_id', $serviceId)->get();

        foreach ($clientService as $client) {
            $service = Service::find($client->service_id);
            $local = Location::find($client->location_id);
            $area = Area::find($client->area_id);
            $client->service_id = $service ? $service->name : null;
            $client->location_id = $local ? $local->name : null;
            $client->area_id = $area ? $area->name : null;
        }

        return new JsonResponse([
            'status' => 200,
            'msg' => 'Search results',
            'clients' => $clientService
        ]);
    }
}
