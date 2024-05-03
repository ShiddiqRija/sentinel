<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DeviceUsageCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            $created_at = $item->created_at;
            
            return [
                'cpu_percent' => $item->cpu_percent,
                'cpu_percent_per_core' => $item->cpu_percent_per_core,
                'memory_percent' => $item->memory_percent,
                'memory_total' => $item->memory_total,
                'memory_used' => $item->memory_used,
                'memory_free' => $item->memory_free,
                'status' => $item->status,
                'created_at' => $created_at,
            ];
        });
    }
}
