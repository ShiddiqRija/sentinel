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
        Schema::create('contacts', function (Blueprint $table) {
            // foreignId('user_id')->references('id')->on('users');
            $table->uuid('id')->unique();
            $table->foreignUuid('organization_ids')->references('id')->on('organizations')->onDelete('cascade');
            $table->string('name');
            $table->string('phone')->nullable();
            $table->string('email');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('contacts');
    }
};
