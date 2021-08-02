<?php

namespace App\Http\Controllers\Agent;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class AgentDashboardController extends Controller
{
    public function index()
    {
        $properties    = Property::latest()->where('agent_id', Auth::id())->take(5)->get();
        $propertytotal = Property::latest()->where('agent_id', Auth::id())->count();



        return response()->json([
            'success' => true,
            'message'=> "agent property",
            'data'=> [
                'properties' => $properties,
                'propertytotal' =>$propertytotal
            ]
        ]);
    }

    public function profile()
    {
        $profile = Auth::user();

        return response()->json([
            'success' => true,
            'message'=> "agent profile",
            'data'=> $profile
        ]);
    }

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',

        ]);

        $user = User::find(Auth::id());


        if ($request->file('image')) {
            $imagePath = $request->file('image');
            $imageName = $imagePath->getClientOriginalName();

            $path = $request->file('image')->storeAs('uploads', $imageName, 'public');
        }

        $user->name = $request->name;
        $user->bio = $request->bio;
        $user->phone_number= $request->phone_number;
        $user->email = $request->email;
        $user->image = '/storage/'.$path;


        $user->save();

        return response()->json([
            'success' => true,
            'message' => "agent profile",
            'data' => $user
        ]);
    }
}
