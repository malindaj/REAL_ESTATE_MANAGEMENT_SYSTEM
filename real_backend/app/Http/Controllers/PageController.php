<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function allProperties(){
        $properties = Property::all();

//        return response()->json([
//            'success' => true,
//            'message'=> "property List",
//            'data'=> $properties
//        ]);
        return response()->json($properties);
    }

    public function showProperty ($id){
        $property = Property::find($id);
        if (is_null($property)){
            return $this->sendError('Product Not Found');
        }

        return response()->json([
            "success" => true,
            "message" => "Property find",
            "data" => $property
        ]);
    }

    public function agents(){
        $agents = User::all()->where('role_id', 2);

        return response()->json($agents);
    }
    public function agentshow($id)
    {
        $agent      = User::findOrFail($id);
        $properties = Property::latest()->where('agent_id', $id)->paginate(10);

        return response()->json([
            'success' => true,
            'message'=> "agent property",
            'property'=> $properties,
            'agent' => $agent
        ]);
    }

public function search(Request $request)
{
    $city     = strtolower($request->city);
    $type     = $request->type;
    $purpose  = $request->purpose;
    $bedroom  = $request->bedroom;
    $bathroom = $request->bathroom;
    $minprice = $request->minprice;
    $maxprice = $request->maxprice;

    $properties = Property::latest()->when($city, function ($query, $city) {
            return $query->where('city', '=', $city);
        })
        ->when($type, function ($query, $type) {
            return $query->where('type', '=', $type);
        })
        ->when($purpose, function ($query, $purpose) {
            return $query->where('purpose', '=', $purpose);
        })
        ->when($bedroom, function ($query, $bedroom) {
            return $query->where('bedroom', '=', $bedroom);
        })
        ->when($bathroom, function ($query, $bathroom) {
            return $query->where('bathroom', '=', $bathroom);
        })
        ->when($minprice, function ($query, $minprice) {
            return $query->where('price', '>=', $minprice);
        })
        ->when($maxprice, function ($query, $maxprice) {
            return $query->where('price', '<=', $maxprice);
        })
        ->paginate(10);

    return response()->json([
        'success' => true,
        'message'=> "search property",
        'data'=> $properties
    ]);
}
}
