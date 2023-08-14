<?php

namespace App\Http\Controllers;

use App\Http\Resources\AreasCollection;
use App\Models\Area;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AreasController extends Controller
{
    public function getAreas()
    {
        return new AreasCollection(Area::all());
    }

    public function updateArea(Request $request, $id)
    {
        $area = Area::find($id);

        if (!$area) {
            return new JsonResponse([
                'status' => JsonResponse::HTTP_NOT_FOUND,
                'Error' => 'No Exists Area'
            ], JsonResponse::HTTP_NOT_FOUND);
        }
        // $area = Area::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'status' => 'in:0,1'
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => JsonResponse::HTTP_BAD_REQUEST,
                'error' => $validator->errors()
            ], JsonResponse::HTTP_BAD_REQUEST);
        }

        $area->update([
            'status' => $request->status
        ]);

        return new JsonResponse([
            'status' => JsonResponse::HTTP_OK,
            'data' => [
                'id' => $area->id,
                'name' => $area->name,
                'status' => $area->status,
            ]
        ], JsonResponse::HTTP_OK);
    }

    public function getAreasPaginate()
    {
        $areas = Area::paginate(10);

        return new JsonResponse([
            'status' => 200,
            'msg' => 'List Areas Paginate',
            'areas' => $areas
        ]);
    }
}
