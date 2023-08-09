<?php

namespace App\Http\Controllers;

use App\Models\Area;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class AreasController extends Controller
{
    public function getAreas()
    {
        $areas = Area::all();

        return new JsonResponse([
            'status' => 200,
            'msg' => 'List Areas',
            'areas' => $areas
        ]);
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

    public function updateState(Request $request, $id)
    {
        $area = Area::find($id);

        if (!$area) {
            return new JsonResponse([
                'status' => 404,
                'msg' => 'No exists Area'
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'status' => 'in:0,1'
        ]);

        if ($validator->fails()) {
            return new JsonResponse([
                'status' => 400,
                'error' => $validator->errors()
            ],400);
        }

        $area->update([
            'status' => $request->status
        ]);

        return  new JsonResponse([
            'status' => 200,
            'msg' => 'Update Area',
            'area' => $area
        ]);
    }
}
