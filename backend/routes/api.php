<?php

use App\Http\Controllers\MotorcycleController;
use Illuminate\Support\Facades\Route;

Route::apiResource('motorcycles', MotorcycleController::class);
