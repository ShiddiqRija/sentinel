<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DeviceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $created_at = Carbon::parse($this->create_at)->format('M j, Y g:i:s A');

        $last_logon = Carbon::parse($this->device_info->last_logon)->format('M j, Y g:i:s A');
        // $last_reboot = Carbon::parse($this->device_info->last_reboot)->format('M j, Y g:i:s A');
        $last_reboot = Carbon::parse($this->device_info->last_reboot);
        $formatted_last_reboot = $last_reboot->format('M j, Y g:i:s A');

        return [
            'id' => $this->id,
            'organization' => $this->organization->only('id', 'name'),
            'machine_name' => $this->device_info->machine_name,
            'user_logon' => $this->device_info->user_logon,
            'last_logon' => $last_logon,
            'last_reboot' => $formatted_last_reboot . ' ( ' . $last_reboot->diffForHumans() . ' )',
            'domain' => $this->device_info->domain,
            'ip_address' => $this->device_info->ip_address,
            'os_edition' => $this->device_info->os_edition,
            'os_version' => $this->device_info->os_version,
            'os_build' => $this->device_info->os_build,
            'office_version' => $this->device_info->office_version,
            'vendor' => $this->device_info->vendor,
            'model' => $this->device_info->model,
            'serial_number' => $this->device_info->serial_number,
            'motherboard' => $this->device_info->motherboard,
            'bios_vendor' => $this->device_info->bios_vendor,
            'bios_version' => $this->device_info->bios_version,
            'bios_release_date' => $this->device_info->bios_release_date,
            'processor' => $this->device_info->processor,
            'memory' => $this->device_info->memory,
            'video_card' => $this->device_info->video_card,
            'sound' => $this->device_info->sound,
            'system_drive' => $this->device_info->system_drive,
            'network' => json_decode($this->device_info->network),
            'antivirus' => json_decode($this->device_info->antivirus),
            'firewall' => $this->device_info->antivirus,
            'created_at' => $created_at,
            // 'created_at' => date("M j, Y g:i:s A", $created_at),
        ];
    }
}
