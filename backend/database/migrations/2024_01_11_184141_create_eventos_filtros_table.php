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
        Schema::create('eventos_filtros', function (Blueprint $table) {
            $table->foreignId('evento_id')
                ->constrained('evento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('filtro_id')
                ->constrained('filtro')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('eventos_filtros');
    }
};
