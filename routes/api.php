<?php

use App\Http\Controllers\DeviceController;
use App\Http\Controllers\PatchesController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('device', [DeviceController::class, 'register']);
Route::post('device/info', [DeviceController::class, 'storeInfo']);
Route::post('device/disk', [DeviceController::class, 'storeDisk']);
Route::post('device/usage', [DeviceController::class, 'storeUsage']);
Route::post('device/wu', [PatchesController::class, 'store']);