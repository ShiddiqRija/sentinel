<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DiskCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            return [
                'disk' => $item->disk,
                'media_type' => $item->media_type,
                'model' => $item->model,
                'serial_number' => $item->serial_number,
                'bus_type' => $item->bus_type,
                'operational_status' => $item->operational_status,
                'health_status' => $item->health_status,
                'firmware_version' => $item->firmware_version,
                'size' => $item->size,
                'free' => $item->free,
                'drives' => json_decode($item->drives),
                'status' => $item->status,
            ];
        });
    }
}
