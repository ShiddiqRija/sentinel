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
        Schema::create('patches', function (Blueprint $table) {
            $table->uuid('id')->uniqid();
            $table->foreignUuid('device_ids')->references('id')->on('devices')->onDelete('cascade');
            $table->string('kb')->nullable();
            $table->string('title');
            $table->dateTime('date')->nullable();
            $table->longText('description');
            $table->string('classification');
            $table->string('support_product')->nullable();
            $table->string('support_url');
            $table->string('operation')->nullable();
            $table->string('result')->nullable();
            $table->string('file_size')->nullable();
            $table->string('reboot_required')->nullable();
            $table->string('is_present')->nullable();
            $table->string('is_downloaded')->nullable();
            $table->string('type');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('patches');
    }
};
