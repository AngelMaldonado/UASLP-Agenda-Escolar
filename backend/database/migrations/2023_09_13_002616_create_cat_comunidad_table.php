<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    //create_cat_comunidad_table
    public function up(): void
    {
        Schema::create('cat_comunidad', function (Blueprint $table) {
            $table->id();
            $table->string('descripcion', 250);
            $table->string('icono');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_comunidad');
    }
};
