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
        Schema::create('players', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('university');
            $table->string('category');
            $table->double('total_runs');
            $table->double('balls_faced');
            $table->double('innings_played');
            $table->double('wickets')->nullable();
            $table->double('overs_bowled')->nullable();
            $table->double('runs_conceded')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('players');
    }
};
