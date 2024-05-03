<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Devices extends Model
{
    use HasFactory;
    use HasUuids;
    use SoftDeletes;

    protected $fillable = [
        'organization_ids',
        'device_info_ids',
    ];

    public function organization()
    {
        return $this->hasOne(Organizations::class, 'id', 'organization_ids');
    }

    public function device_info()
    {
        return $this->hasOne(DeviceInfo::class, 'id', 'device_info_ids');
    }

    public function patches()
    {
        return $this->hasMany(Patches::class, 'device_ids', 'id');
    }

    public function scopeFilter($query, array $filters)
    {
        $query->when($filters['search'] ?? null, function ($query, $search) {
            $query->where('organization_ids', 'like', "%{$search}%")
                ->orWhere('device_info_ids', 'like', "%{$search}%");
        });
    }
}
