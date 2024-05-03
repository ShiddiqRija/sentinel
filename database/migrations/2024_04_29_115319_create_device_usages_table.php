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
        Schema::create('device_usages', function (Blueprint $table) {
            $table->uuid('id')->unique();
            $table->foreignUuid('device_ids')->references('id')->on('devices')->onDelete('cascade');
            $table->integer('cpu_percent');
            $table->longText('cpu_percent_per_core');
            $table->integer('memory_percent');
            $table->bigInteger('memory_total');
            $table->bigInteger('memory_used');
            $table->bigInteger('memory_free');
            $table->enum('status', ['active', 'history']);
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('device_usages');
    }
};
