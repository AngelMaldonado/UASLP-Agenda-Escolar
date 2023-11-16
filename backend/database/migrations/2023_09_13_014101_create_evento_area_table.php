<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    //create_evento_area_table
    public function up(): void
    {
        Schema::create('evento_area', function (Blueprint $table) {
            $table->foreignId('evento_id')
                ->constrained('evento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreignId('cat_area_id')
                ->constrained('cat_area')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evento_area');
    }
};
