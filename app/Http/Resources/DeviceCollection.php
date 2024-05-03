<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class DeviceCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return $this->collection->map(function ($item) {
            $last_logon = Carbon::parse($item->device_info->last_logon)->format('M j, Y g:i:s A');
            
            return [
                'id' => $item->id,
                'organization_ids' => $item->organization->name,
                'device_info_ids' => $item->device_info_ids,
                'device_image' => 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png',
                'machine_name' => $item->device_info->machine_name,
                'last_login' => $item->device_info->user_logon . ' ( ' . $last_logon . ' )',
                'status' => "Online",
                'alerts' => [
                    'critical' => 0,
                    'warning' => 0,
                    'info' => 0,
                ],
                'avail_patch' => $item->patches->where('type', 'available')->count(),
            ];
        });
    }
}
