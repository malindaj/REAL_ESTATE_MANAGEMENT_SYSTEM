<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $propertycount = Property::count();
        $usercount     = User::count();

        $properties    = Property::latest()->with('user')->take(5)->get();

        $users         = User::with('role')->get();

        return response()->json([
            'success' => true,
            'message'=> "admin prperty",
            'data'=> [
                'properties' => $properties,
                'propertycount' =>$propertycount,
                'users' => $users,
                'usercount' => $usercount
            ]
        ]);
    }

    public function profile()
    {
        $profile = Auth::user();

        return response()->json([
            'success' => true,
            'message'=> "admin prperty",
            'data'=> $profile
        ]);

    }

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'username' => 'required',
            'email' => 'required|email',
            'image' => 'image|mimes:jpeg,jpg,png',

        ]);

        $user = User::find(Auth::id());

        $image = $request->file('image');
        $slug = str_slug($request->name);

        if (isset($image)) {
            $currentDate = Carbon::now()->toDateString();
            $imagename = $slug . '-admin-' . Auth::id() . '-' . $currentDate . '.' . $image->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('users')) {
                Storage::disk('public')->makeDirectory('users');
            }
            if (Storage::disk('public')->exists('users/' . $user->image) && $user->image != 'default.png') {
                Storage::disk('public')->delete('users/' . $user->image);
            }
            $userimage = Image::make($image)->stream();
            Storage::disk('public')->put('users/' . $imagename, $userimage);

        } else {
            $imagename = $user->image;
        }

        $user->name = $request->name;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->image = $imagename;


        $user->save();

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $user
        ]);
    }

}
