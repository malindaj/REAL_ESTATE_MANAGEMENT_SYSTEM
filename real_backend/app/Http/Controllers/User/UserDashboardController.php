<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;


class UserDashboardController extends Controller
{
    public function profile()
    {
        $profile = Auth::user();

        return response()->json([
            "success" => true,
            "message" => " successfully.",
            "data" => $profile
        ]);
//        return response()->json(auth()->user());
    }

    public function profileUpdate(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email',
            'image' => 'image|mimes:jpeg,jpg,png',

        ]);

        $user = User::find(Auth::id());

        $image = $request->file('image');
        $slug = str_slug($request->name);

        if (isset($image)) {
            $currentDate = Carbon::now()->toDateString();
            $imagename = $slug . '-user-' . Auth::id() . '-' . $currentDate . '.' . $image->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('users')) {
                Storage::disk('public')->makeDirectory('users');
            }
            if (Storage::disk('public')->exists('users/' . $user->image) && $user->image != 'default.png') {
                Storage::disk('public')->delete('users/' . $user->image);
            }
            $userimage = Image::make($image)->stream();
            Storage::disk('public')->put('users/' . $imagename, $userimage);
        }

        $user->name = $request->name;
        $user->email = $request->email;
        $user->image = $imagename;


        $user->save();

        return response()->json([
            "success" => true,
            "message" => " successfully.",
            "data" => $user
        ]);
    }
}
