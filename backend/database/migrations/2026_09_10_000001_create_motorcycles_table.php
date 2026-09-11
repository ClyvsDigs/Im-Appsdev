<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('motorcycles', function (Blueprint $table) {
            $table->string('id', 30)->primary();
            $table->string('brand', 100);
            $table->unsignedSmallInteger('year');
            $table->string('model', 100);
            $table->string('engine_number', 100);
            $table->unsignedInteger('engine_displacement');
            $table->string('fuel_type', 30);
            $table->string('plate_number', 50);
            $table->string('chassis_number', 100);
            $table->string('transmission', 30);
            $table->decimal('fuel_capacity', 6, 2);
            $table->string('color', 100);
            $table->decimal('price', 12, 2);
            $table->string('motorcycle_picture')->nullable();
            $table->unsignedBigInteger('mileage')->default(0);
            $table->text('description')->nullable();
            $table->timestamps();

            $table->index(['brand', 'model']);
            $table->index('created_at');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('motorcycles');
    }
};
