<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeviceUsage extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $fillable = [
        'device_ids',
        'cpu_percent',
        'cpu_percent_per_core',
        'memory_percent',
        'memory_total',
        'memory_used',
        'memory_free',
        'status',
    ];
}
