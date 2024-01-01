<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Devices extends Model
{
    use HasFactory, HasUuids;

    protected $fillable = [
        'organization_ids',
        'machine_name',
        'domain',
        'ip_address',
        'os_edition',
        'os_version',
        'os_build',
        'office_version',
        'vendor',
        'model',
        'serial_number',
        'motherboard',
        'processor',
        'memory',
        'video_card',
        'sound',
        'system_drive',
        'mac_address',
    ];
}
