<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $table = 'clients';
    protected $fillable = [
        'name',
        'phone',
        'info',
        'email',
        'business_name',
        'location_id',
        'service_id',
        'area_id',
    ];

    public function location()
    {
        return $this->hasOne(Location::class);
    }

    public function service()
    {
        return $this->hasOne(Area::class);
    }

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
