<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Patches extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $fillable = [
        'device_ids',
        'kb',
        'title',
        'date',
        'description',
        'classification',
        'support_product',
        'support_url',
        'file_size',
        'reboot_required',
        'is_present',
        'is_downloaded',
        'type',
    ];
}
