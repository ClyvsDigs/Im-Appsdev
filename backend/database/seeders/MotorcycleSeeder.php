<?php

namespace Database\Seeders;

use App\Models\Motorcycle;
use Illuminate\Database\Seeder;

class MotorcycleSeeder extends Seeder
{
    public function run(): void
    {
        $items = [
            ['id'=>'mc-001','brand'=>'Honda','year'=>2025,'model'=>'Click 160','engine_number'=>'HC160-25001','engine_displacement'=>157,'fuel_type'=>'Gasoline','plate_number'=>'MCF-1601','chassis_number'=>'HNDCL160A001','transmission'=>'Automatic','fuel_capacity'=>5.5,'color'=>'Matte Black','price'=>122000,'motorcycle_picture'=>'motorcycles/honda-click.svg','mileage'=>1240,'description'=>'A practical automatic scooter with sporty styling and excellent everyday fuel economy.'],
            ['id'=>'mc-002','brand'=>'Yamaha','year'=>2024,'model'=>'NMAX 155','engine_number'=>'YNM155-24018','engine_displacement'=>155,'fuel_type'=>'Gasoline','plate_number'=>'MCF-1552','chassis_number'=>'YMHNM155B018','transmission'=>'Automatic','fuel_capacity'=>7.1,'color'=>'Pearl White','price'=>155000,'motorcycle_picture'=>'motorcycles/yamaha-nmax.svg','mileage'=>2840,'description'=>'Comfortable maxi-scooter suited for city commuting and longer rides.'],
            ['id'=>'mc-003','brand'=>'Suzuki','year'=>2023,'model'=>'Raider R150','engine_number'=>'SR150-23142','engine_displacement'=>147,'fuel_type'=>'Gasoline','plate_number'=>'MCF-1503','chassis_number'=>'SZR150C142','transmission'=>'Manual','fuel_capacity'=>4.9,'color'=>'Metallic Blue','price'=>97800,'motorcycle_picture'=>'motorcycles/suzuki-raider.svg','mileage'=>5610,'description'=>'Lightweight underbone motorcycle with responsive handling and a sporty character.'],
            ['id'=>'mc-004','brand'=>'Kawasaki','year'=>2025,'model'=>'Ninja 400','engine_number'=>'KN400-25009','engine_displacement'=>399,'fuel_type'=>'Gasoline','plate_number'=>'MCF-4004','chassis_number'=>'KWN400D009','transmission'=>'Manual','fuel_capacity'=>14,'color'=>'Lime Green','price'=>331000,'motorcycle_picture'=>'motorcycles/kawasaki-ninja.svg','mileage'=>820,'description'=>'A beginner-friendly sportbike with strong performance and confident road manners.'],
            ['id'=>'mc-005','brand'=>'Honda','year'=>2024,'model'=>'ADV 160','engine_number'=>'HADV160-24111','engine_displacement'=>157,'fuel_type'=>'Gasoline','plate_number'=>'MCF-1605','chassis_number'=>'HNDADV160E111','transmission'=>'Automatic','fuel_capacity'=>8.1,'color'=>'Gray','price'=>166000,'motorcycle_picture'=>'motorcycles/honda-adv.svg','mileage'=>3900,'description'=>'Adventure-inspired scooter with comfortable ergonomics and practical storage.'],
            ['id'=>'mc-006','brand'=>'Yamaha','year'=>2022,'model'=>'MT-15','engine_number'=>'YMT15-22107','engine_displacement'=>155,'fuel_type'=>'Gasoline','plate_number'=>'MCF-1506','chassis_number'=>'YMHMT15F107','transmission'=>'Manual','fuel_capacity'=>10,'color'=>'Black','price'=>145000,'motorcycle_picture'=>'motorcycles/yamaha-mt.svg','mileage'=>8750,'description'=>'Naked street motorcycle with an agile chassis and distinctive aggressive design.'],
        ];

        foreach ($items as $item) {
            Motorcycle::updateOrCreate(['id' => $item['id']], $item);
        }
    }
}
