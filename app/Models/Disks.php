<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Disks extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'device_ids',
        'disk',
        'media_type',
        'model',
        'serial_number',
        'partitions',
        'interface',
        'operational_status',
        'health_status',
        'firmware_version',
        'drive',
        'free_space',
        'used_space',
        'total_space',
    ];
}
