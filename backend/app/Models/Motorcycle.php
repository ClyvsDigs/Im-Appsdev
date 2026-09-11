<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Motorcycle extends Model
{
    protected $fillable = [
        'id',
        'brand',
        'year',
        'model',
        'engine_number',
        'engine_displacement',
        'fuel_type',
        'plate_number',
        'chassis_number',
        'transmission',
        'fuel_capacity',
        'color',
        'price',
        'motorcycle_picture',
        'mileage',
        'description',
    ];

    protected $casts = [
        'year' => 'integer',
        'engine_displacement' => 'integer',
        'fuel_capacity' => 'decimal:2',
        'price' => 'decimal:2',
        'mileage' => 'integer',
    ];

    public $incrementing = false;
    protected $keyType = 'string';
}
