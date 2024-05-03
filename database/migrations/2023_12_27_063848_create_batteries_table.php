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
        Schema::create('batteries', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('device_ids')->references('id')->on('devices')->onDelete('cascade');
            $table->string('battery_id');
            $table->string('health');
            $table->string('battery_design_cap');
            $table->string('battery_full_Charge_cap');
            $table->string('cycle_count');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('batteries');
    }
};
