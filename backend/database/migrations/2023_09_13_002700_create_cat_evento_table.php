<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    //create_cat_evento_table
    public function up(): void
    {
        Schema::create('cat_evento', function (Blueprint $table) {
            $table->id();
            $table->string('nombre',100);
            $table->string('descripcion', 250);
            $table->string('simbolo', 200);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('cat_evento');
    }
};
