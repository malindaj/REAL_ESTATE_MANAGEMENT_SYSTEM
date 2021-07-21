<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',    'price',        'featured',     'purpose',  'type',         'image',
        'slug',     'bedroom',      'bathroom',     'city',     'city_slug',    'address',
        'area',     'agent_id',     'description',  'video',    'floor_plan',
        'location_latitude',        'location_longitude',       'nearby',

    ];

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function propertyType() {
        return $this->belongsTo(PropertyType::class);
    }
    public function propertyImages(){
        return $this->hasMany(PropertyImage::class);
    }
}
