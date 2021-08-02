<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Property extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',    'price',        'featured',     'purpose',  'type',         'image', 'image2','image3',
             'bedroom',      'bathroom',     'city',         'address', 'garages', 'type',
        'area',     'agent_id',     'description',      'floor_plan',
        'location_latitude',        'location_longitude',       'nearby','purpose',

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
