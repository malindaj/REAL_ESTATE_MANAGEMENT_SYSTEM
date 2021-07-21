<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Property;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class AdminPropertyController extends Controller
{
    public function index()
    {
        $properties = Property::latest();

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $properties
        ]);

    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|unique:properties|max:255',
            'price' => 'required',
            'purpose' => 'required',
            'type' => 'required',
            'bedroom' => 'required',
            'bathroom' => 'required',
            'city' => 'required',
            'address' => 'required',
            'area' => 'required',
            'image' => 'required|image|mimes:jpeg,jpg,png',
            'floor_plan' => 'image|mimes:jpeg,jpg,png',
            'description' => 'required',
            'location_latitude' => 'required',
            'location_longitude' => 'required',
        ]);

        $image = $request->file('image');
        $slug = str_slug($request->title);

        if (isset($image)) {
            $currentDate = Carbon::now()->toDateString();
            $imagename = $slug . '-' . $currentDate . '-' . uniqid() . '.' . $image->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('property')) {
                Storage::disk('public')->makeDirectory('property');
            }
            $propertyimage = Image::make($image)->stream();
            Storage::disk('public')->put('property/' . $imagename, $propertyimage);

        }

        $floor_plan = $request->file('floor_plan');
        if (isset($floor_plan)) {
            $currentDate = Carbon::now()->toDateString();
            $imagefloorplan = 'floor-plan-' . $currentDate . '-' . uniqid() . '.' . $floor_plan->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('property')) {
                Storage::disk('public')->makeDirectory('property');
            }
            $propertyfloorplan = Image::make($floor_plan)->stream();
            Storage::disk('public')->put('property/' . $imagefloorplan, $propertyfloorplan);

        } else {
            $imagefloorplan = 'default.png';
        }

        $property = new Property();
        $property->title = $request->title;
        $property->slug = $slug;
        $property->price = $request->price;
        $property->purpose = $request->purpose;
        $property->type = $request->type;
        $property->image = $imagename;
        $property->bedroom = $request->bedroom;
        $property->bathroom = $request->bathroom;
        $property->city = $request->city;
        $property->city_slug = str_slug($request->city);
        $property->address = $request->address;
        $property->area = $request->area;

        $property->agent_id = Auth::id();
        $property->description = $request->description;
        $property->video = $request->video;
        $property->floor_plan = $imagefloorplan;
        $property->location_latitude = $request->location_latitude;
        $property->location_longitude = $request->location_longitude;
        $property->nearby = $request->nearby;
        $property->save();

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $property
        ]);
    }

    public function show(Property $property)
    {
        $property = Property::find($property->id);

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $property
        ]);
    }

    public function update(Request $request,Property $property)
    {
        $request->validate([
            'title' => 'required|max:255',
            'price' => 'required',
            'purpose' => 'required',
            'type' => 'required',
            'bedroom' => 'required',
            'bathroom' => 'required',
            'city' => 'required',
            'address' => 'required',
            'area' => 'required',
            'image' => 'image|mimes:jpeg,jpg,png',
            'floor_plan' => 'image|mimes:jpeg,jpg,png',
            'description' => 'required',
            'location_latitude' => 'required',
            'location_longitude' => 'required'
        ]);

        $image = $request->file('image');
        $slug = str_slug($request->title);

        $property = Property::find($property->id);

        if (isset($image)) {
            $currentDate = Carbon::now()->toDateString();
            $imagename = $slug . '-' . $currentDate . '-' . uniqid() . '.' . $image->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('property')) {
                Storage::disk('public')->makeDirectory('property');
            }
            if (Storage::disk('public')->exists('property/' . $property->image)) {
                Storage::disk('public')->delete('property/' . $property->image);
            }
            $propertyimage = Image::make($image)->stream();
            Storage::disk('public')->put('property/' . $imagename, $propertyimage);

        } else {
            $imagename = $property->image;
        }


        $floor_plan = $request->file('floor_plan');
        if (isset($floor_plan)) {
            $currentDate = Carbon::now()->toDateString();
            $imagefloorplan = 'floor-plan-' . $currentDate . '-' . uniqid() . '.' . $floor_plan->getClientOriginalExtension();

            if (!Storage::disk('public')->exists('property')) {
                Storage::disk('public')->makeDirectory('property');
            }
            if (Storage::disk('public')->exists('property/' . $property->floor_plan)) {
                Storage::disk('public')->delete('property/' . $property->floor_plan);
            }

            $propertyfloorplan = Image::make($floor_plan)->stream();
            Storage::disk('public')->put('property/' . $imagefloorplan, $propertyfloorplan);

        } else {
            $imagefloorplan = $property->floor_plan;
        }

        $property->title = $request->title;
        $property->slug = $slug;
        $property->price = $request->price;
        $property->purpose = $request->purpose;
        $property->type = $request->type;
        $property->image = $imagename;
        $property->bedroom = $request->bedroom;
        $property->bathroom = $request->bathroom;
        $property->city = $request->city;
        $property->city_slug = str_slug($request->city);
        $property->address = $request->address;
        $property->area = $request->area;

        $property->description = $request->description;
        $property->video = $request->video;
        $property->floor_plan = $imagefloorplan;
        $property->location_latitude = $request->location_latitude;
        $property->location_longitude = $request->location_longitude;
        $property->nearby = $request->nearby;
        $property->save();

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $property
        ]);
    }
    public function destroy(Property $property)
    {
        $property = Property::find($property->id);

        if (Storage::disk('public')->exists('property/' . $property->image)) {
            Storage::disk('public')->delete('property/' . $property->image);
        }
        if (Storage::disk('public')->exists('property/' . $property->floor_plan)) {
            Storage::disk('public')->delete('property/' . $property->floor_plan);
        }

        $property->delete();

        return response()->json([
            'success' => true,
            'message' => "admin prperty",
            'data' => $property
        ]);

    }

}
