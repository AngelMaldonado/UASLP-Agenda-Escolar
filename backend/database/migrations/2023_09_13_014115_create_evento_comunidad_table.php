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
        Schema::create('evento_comunidad', function (Blueprint $table) {
            $table->unsignedBigInteger('cat_evento_id');
            $table->unsignedBigInteger('cat_comunidad_id');

            $table->foreign('cat_evento_id')->references('id')->on('cat_evento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('cat_comunidad_id')->references('id')->on('cat_comunidad')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evento_comunidad');
    }
};
