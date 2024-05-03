<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('disks', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('device_ids')->references('id')->on('devices')->onDelete('cascade');
            $table->string('disk');
            $table->string('media_type');
            $table->string('model');
            $table->string('serial_number');
            $table->string('bus_type');
            // $table->string('interface');
            $table->string('operational_status');
            $table->string('health_status');
            $table->string('firmware_version');
            $table->bigInteger('size');
            $table->bigInteger('free');
            $table->longText('drives');
            $table->enum('status', ['active', 'history'])->default('active');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('disks');
    }
};
