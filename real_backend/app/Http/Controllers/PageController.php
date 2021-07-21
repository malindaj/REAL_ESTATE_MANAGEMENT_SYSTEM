<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Models\User;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function allProperties(){
        $properties = Property::all();

        return response()->json([
            'success' => true,
            'message'=> "property List",
            'data'=> $properties
        ]);
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
        $agents = User::latest()->where('role_id', 2)->paginate(12);

        return response()->json([
            'success' => true,
            'message'=> "agent List",
            'data'=> $agents
        ]);
    }
    public function agentshow($id)
    {
        $agent      = User::findOrFail($id);
        $properties = Property::latest()->where('agent_id', $id)->paginate(10);

        return response()->json([
            'success' => true,
            'message'=> "agent property",
            'data'=> $properties
        ]);
    }
}
