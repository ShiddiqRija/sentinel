<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class DeviceInfo extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $fillable = [
        'device_ids',
        'machine_name',
        'user_logon',
        'last_logon',
        'last_reboot',
        'domain',
        'os_edition',
        'os_version',
        'os_build',
        'vendor',
        'model',
        'serial_number',
        'motherboard',
        'bios_vendor',
        'bios_version',
        'bios_release_date',
        'processor',
        'memory',
        'video_card',
        'sound',
        'system_drive',
        'network',
        'antivirus',
        'firewall',
    ];
}
