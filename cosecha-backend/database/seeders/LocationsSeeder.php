<?php

namespace Database\Seeders;

use App\Models\Location;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Location::create(['name' => 'Craigslist']);
        Location::create(['name' => 'Yelp']);
        Location::create(['name' => 'Local']);
        Location::create(['name' => 'UsDirectory']);
        Location::create(['name' => 'Handy']);
        Location::create(['name' => 'YellowPages']);
        Location::create(['name' => 'Angielist']);
        Location::create(['name' => 'HomeAdviser']);
        Location::create(['name' => 'Google']);
        Location::create(['name' => 'Care']);
        Location::create(['name' => 'Thumbtack']);
        Location::create(['name' => 'CatySearch']);
        Location::create(['name' => 'NextDoor']);
        Location::create(['name' => 'Chat']);
        Location::create(['name' => 'Referencia']);
        Location::create(['name' => 'Other']);
    }
}
