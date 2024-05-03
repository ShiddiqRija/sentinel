<?php

use App\Http\Controllers\DeviceController;
use App\Http\Controllers\OrganizationController;
use App\Http\Controllers\PatchesController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::resource('organization', OrganizationController::class)
    ->only(['index', 'create', 'store', 'show', 'edit', 'update', 'destroy']);

Route::get('organization/{organization}/contact', [OrganizationController::class, 'getAllCotact'])->name('organization.contact.list');
Route::post('organization/{organization}/contact', [OrganizationController::class, 'storeContact'])->name('organization.contact.store');
Route::get('organization/{organization}/contact/{contact}/edit', [OrganizationController::class, 'editContact'])->name('organization.contact.edit');
Route::put('organization/{organization}/contact/{contact}', [OrganizationController::class, 'updateContact'])->name('organization.contact.update');
Route::delete('organization/{organzation}/contact/{contact}', [OrganizationController::class, 'deleteContact'])->name('organization.contact.destory');

Route::resource('device', DeviceController::class)
    ->only(['index', 'show', 'destroy']);
Route::get('device/patches/{device}', [PatchesController::class, 'show'])->name('device.patches');
Route::put('device/patches/{patches}', [PatchesController::class, 'patching'])->name('device.patch.install');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
