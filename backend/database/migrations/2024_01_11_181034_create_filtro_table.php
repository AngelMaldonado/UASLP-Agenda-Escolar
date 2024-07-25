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
        Schema::create('filtro', function (Blueprint $table) {
            $table->id();
            $table->string('nombre', 60);
            $table->string('icono', 62); // <- iconos/categoria/unique_id.svg
            $table->enum('categoria', ['área', 'comunidad']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('filtro');
    }
};
