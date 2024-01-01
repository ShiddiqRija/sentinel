<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Batteries extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'device_ids',
        'battery_id',
        'health',
        'battery_design_cap',
        'battery_full_Charge_cap',
        'cycle_count',
    ];
}
