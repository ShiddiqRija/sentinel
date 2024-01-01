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
        Schema::create('devices', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('organization_ids')->references('id')->on('organizations')->onDelete('cascade');
            $table->string('machine_name');
            $table->string('domain');
            $table->string('ip_address');
            $table->string('os_edition');
            $table->string('os_version');
            $table->string('os_build');
            $table->string('office_version');
            $table->string('vendor');
            $table->string('model');
            $table->string('serial_number');
            $table->string('motherboard');
            $table->string('processor');
            $table->string('memory');
            $table->string('video_card');
            $table->string('sound');
            $table->string('system_drive');
            $table->string('mac_address');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('devices');
    }
};
