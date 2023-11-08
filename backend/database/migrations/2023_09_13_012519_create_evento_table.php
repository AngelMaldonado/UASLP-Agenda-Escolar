<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    //Crear tabla evento
    public function up(): void
    {
        Schema::create('evento', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('cat_evento_id')->nullable();
            $table->unsignedBigInteger('usuario_id');
            $table->string('nombre', 100);
            $table->dateTime('fecha_inicio');
            $table->dateTime('fecha_fin');
            $table->json('hipervinculos')->nullable();
            $table->string('imagen', 200)->nullable();
            $table->string('descripcion', 250);
            //los tipos seran: facultad, alumnado, catalogo
            $table->string('tipo',10);

            $table->foreign('cat_evento_id')->references('id')->on('cat_evento')
                ->onUpdate('cascade')
                ->onDelete('cascade');
            $table->foreign('usuario_id')->references('id')->on('usuario')
                ->onUpdate('cascade')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('evento');
    }
};
