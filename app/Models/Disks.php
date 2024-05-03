<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Disks extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $fillable = [
        'device_ids',
        'disk',
        'media_type',
        'model',
        'serial_number',
        'bus_type',
        // 'interface',
        'operational_status',
        'health_status',
        'firmware_version',
        'size',
        'free',
        'drives',
        'status',
    ];
}
