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
            $table->unsignedBigInteger('cat_evento_id');
            $table->unsignedBigInteger('cat_area_id');

            $table->foreign('cat_evento_id')->references('id')->on('cat_evento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('cat_area_id')->references('id')->on('cat_area')
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
