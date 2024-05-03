<?php

namespace App\Http\Controllers;

use App\Models\Devices;
use App\Models\Patches;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

use function PHPSTORM_META\type;

class PatchesController extends Controller
{
    public function store(Request $request)
    {
        try {
            DB::beginTransaction();

            $data = $request->all();

            $patches = Patches::where('device_ids', $data['device_ids'])->get();

            if ($patches->count() > 0) {
                foreach ($patches as $patch) {
                    $patch->forceDelete();
                }
            }

            foreach ($data['installed'] as $installed) {
                Patches::create([
                    'device_ids' => $data['device_ids'],
                    'kb' => $installed['kb'],
                    'title' => $installed['title'],
                    'date' => $installed['date'],
                    'description' => $installed['description'],
                    'classification' => $installed['classification'],
                    'support_product' => $installed['support_product'],
                    'support_url' => $installed['support_url'],
                    'type' => $installed['type'],
                ]);
            }

            foreach ($data['available'] as $avail) {
                Patches::create([
                    'device_ids' => $data['device_ids'],
                    'kb' => $avail['kb'],
                    'title' => $avail['title'],
                    'description' => $avail['description'],
                    'classification' => $avail['classification'],
                    'support_product' => $avail['support_product'],
                    'support_url' => $avail['support_url'],
                    'file_size' => $avail['file_size'],
                    'reboot_required' => $avail['reboot_required'],
                    'is_present' => $avail['is_present'],
                    'is_downloaded' => $avail['is_downloaded'],
                    'type' => $avail['type'],
                ]);
            }

            DB::commit();

            return response()->json([
                'status' => 'success',
            ], 200);
        } catch (\Exception $error) {
            Log::error('Add patches information failed', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }

    public function show(Devices $device)
    {
        $patches = Patches::where('device_ids', $device->id)->get();

        return response()->json([
            'status' => 'success',
            'patches' => $patches,
        ], 200);
    }

    public function patching(Patches $patches)
    {
        try {
            DB::beginTransaction();

            $patches->update([
                'type' => 'installing'
            ]);

            DB::commit();

            return response()->json([
                'status' => 'success',
                'patch' => $patches
            ], 200);
        } catch (\Exception $error) {
            Log::error('Trying to install patch', ['exception' => $error]);

            DB::rollBack();

            return response()->json([
                'status' => 'failed',
                'message' => $error->getMessage()
            ], 422);
        }
    }
}
