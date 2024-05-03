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
        Schema::create('device_infos', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('device_ids')->references('id')->on('devices')->onDelete('cascade');
            $table->string('machine_name');
            $table->string('user_logon');
            $table->dateTime('last_logon');
            $table->dateTime('last_reboot');
            $table->string('domain');
            $table->string('os_edition');
            $table->string('os_version');
            $table->string('os_build');
            $table->string('vendor');
            $table->string('model');
            $table->string('serial_number');
            $table->string('motherboard');
            $table->string('bios_vendor');
            $table->string('bios_version');
            $table->date('bios_release_date');
            $table->string('processor');
            $table->string('memory');
            $table->string('video_card');
            $table->string('sound');
            $table->string('system_drive');
            $table->longText('network');
            $table->longText('antivirus');
            $table->longText("firewall");
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device_infos');
    }
};
