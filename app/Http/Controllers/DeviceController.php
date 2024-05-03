<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeviceRequest;
use App\Http\Resources\DeviceCollection;
use App\Http\Resources\DeviceResource;
use App\Http\Resources\DeviceUsageCollection;
use App\Http\Resources\DiskCollection;
use App\Models\DeviceInfo;
use App\Models\Devices;
use App\Models\DeviceUsage;
use App\Models\Disks;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Request as FacadesRequest;
use Inertia\Inertia;

class DeviceController extends Controller
{
    public function index()
    {
        return Inertia::render('Device/Index', [
            'devices' => new DeviceCollection(Devices::query()
                ->filter(FacadesRequest::only('search'))
                ->paginate(25))
        ]);
    }

    //Device Register
    public function register(Request $request)
    {
        try {
            DB::beginTransaction();

            $device = Devices::create([
                'organization_ids' => $request->organization_ids,
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'data' => $device
            ], 200);
        } catch (\Exception $error) {
            Log::error('Register device failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function storeInfo(Request $request)
    {
        try {
            DB::beginTransaction();

            $info = DeviceInfo::create($request->all());

            Devices::where('id', $info->device_ids)->update([
                'device_info_ids' => $info->id
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'data' => $info
            ], 200);
        } catch (\Exception $error) {
            Log::error('Store device info failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function storeDisk(Request $request)
    {
        try {
            DB::beginTransaction();

            $current_disk = Disks::where('device_ids', $request->device_ids)->get();

            foreach ($current_disk as $current) {
                $current->update([
                    'status' => 'history'
                ]);
            }

            $diskInfo = $request->disk;

            foreach ($diskInfo as $disk) {
                Disks::create([
                    'device_ids' => $request->device_ids,
                    'disk' => $disk['disk'],
                    'media_type' => $disk['media_type'],
                    'model' => $disk['model'],
                    'serial_number' => $disk['serial_number'],
                    'bus_type' => $disk['bus_type'],
                    'operational_status' => $disk['operational_status'],
                    'health_status' => $disk['health_status'],
                    'firmware_version' => $disk['firmware_version'],
                    'size' => $disk['size'],
                    'free' => $disk['free'],
                    'drives' => json_encode($disk['drives']),
                    'status' => 'active',
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
                'data' => $request->all()
            ], 200);
        } catch (\Exception $error) {
            Log::error('Store disk info failed');

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function storeUsage(Request $request)
    {
        try {
            DB::beginTransaction();

            $current_usage = DeviceUsage::where('device_ids', $request->device_ids)->get();

            if ($current_usage) {
                foreach ($current_usage as $current) {
                    $current->update([
                        'status' => 'history'
                    ]);
                }
            }

            $usage = DeviceUsage::create([
                'device_ids' => $request->device_ids,
                'cpu_percent' => $request->cpu_percent,
                'cpu_percent_per_core' => json_encode($request->cpu_percent_per_core),
                'memory_percent' => $request->memory_percent,
                'memory_total' => $request->memory_total,
                'memory_used' => $request->memory_used,
                'memory_free' => $request->memory_free,
                'status' => 'active',
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'data' => $usage
            ], 200);
        } catch (\Exception $error) {
            Log::error('Store device usage failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function show(Devices $device)
    {
        $twentyFourHoursAgo = Carbon::now()->subDays(1);

        return Inertia::render('Device/Show', [
            'device' => new DeviceResource($device),
            'disks' => new DiskCollection(Disks::where('device_ids', $device->id)
                ->where('status', 'active')->get()),
            'usages' => new DeviceUsageCollection(DeviceUsage::where('device_ids', $device->id)
                ->where('created_at', '>=', $twentyFourHoursAgo)
                ->get()
                ->reverse()
                ->values())
        ]);
    }

    public function update(DeviceRequest $request, Devices $device)
    {
        try {
            DB::beginTransaction();

            $validation = $request->validated();

            $device->update($validation);

            DB::commit();

            return response()->json([
                'status' => 'success',
            ], 200);
        } catch (\Exception $error) {
            Log::error('Update device failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function destroy(Devices $device)
    {
        try {
            DB::beginTransaction();

            $device->delete();

            DB::commit();

            return back();
        } catch (\Exception $error) {
            Log::error('Deleting device failed', ['exception' => $error]);

            DB::rollBack();

            return back();
        }
    }
}
