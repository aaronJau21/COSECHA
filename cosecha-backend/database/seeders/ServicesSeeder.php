<?php

namespace Database\Seeders;

use App\Models\Service;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ServicesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Service::create(['name' => 'Other']);
        Service::create(['name' => 'Appliance Services']);
        Service::create(['name' => 'Car Wash Mobile']);
        Service::create(['name' => 'Carpentry Services']);
        Service::create(['name' => 'Carpet Cleaning Services']);
        Service::create(['name' => 'Concrete Services']);
        Service::create(['name' => 'Dog Walking S.']);
        Service::create(['name' => 'Drywall Services']);
        Service::create(['name' => 'Electrical Services']);
        Service::create(['name' => 'Flooring Services']);
        Service::create(['name' => 'Garage Door Services']);
        Service::create(['name' => 'Gardening Services']);
        Service::create(['name' => 'Handyman Services']);
        Service::create(['name' => 'Hauling Services']);
        Service::create(['name' => 'House Cleaning Services']);
        Service::create(['name' => 'HVAC Services']);
        Service::create(['name' => 'Landscaping Services']);
        Service::create(['name' => 'Mobile Mechanic']);
        Service::create(['name' => 'Moving Services']);
        Service::create(['name' => 'Painting Services']);
        Service::create(['name' => 'Pet Sitting S.']);
        Service::create(['name' => 'Plumbing Services']);
        Service::create(['name' => 'Pool Services']);
        Service::create(['name' => 'Power Washing Services']);
        Service::create(['name' => 'Remodeling Services']);
        Service::create(['name' => 'Roofing Services']);
        Service::create(['name' => 'Tile Services']);
        Service::create(['name' => 'Tree Services']);
    }
}
