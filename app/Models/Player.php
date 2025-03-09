<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Player extends Model
{
    use HasFactory;

    protected $fillable = [
        'name', 'university', 'category', 'total_runs',
        'balls_faced', 'innings_played', 'wickets',
        'overs_bowled', 'runs_conceded'
    ];

    protected $hidden = [
        'created_at', 'updated_at'
    ];

    public function team()
    {
        return $this->belongsTo(Team::class);
    }
}
