<?php

namespace App\Http\Controllers;

use App\Models\Player;
use App\Models\User;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        $usertype = auth()->user()->role;

        if($usertype != 'admin') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $players = Player::all();

        //total number of players
        $total_players = $players->count();

        //Total Runs scored by all players
        $total_runs = $players->sum('total_runs');

        //Total Wickets taken by all players
        $total_wickets = $players->sum('wickets');

        //Total Number of Universities
        $total_universities = $players->unique('university')->count();

        //Player with Highest Runs his name and details
        $highest_run_scorer = $players->max('total_runs');
        $highest_run_scorer_details = $players->where('total_runs', $highest_run_scorer)->first();

        //Highest Wicket Taker
        $highest_wicket_taker = $players->max('wickets');
        $highest_wicket_taker_details = $players->where('wickets', $highest_wicket_taker)->first();

        //Number of Batsman, Bowlers and All-Rounders
        $batsman = $players->where('category', 'Batsman')->count();
        $bowler = $players->where('category', 'Bowler')->count();
        $all_rounder = $players->where('category', 'All-Rounder')->count();

        //Number of Players from each University
        $universities = $players->groupBy('university')->map->count();

        //Json Response
        return response()->json([
            'total_players' => $total_players,
            'total_runs' => $total_runs,
            'total_wickets' => $total_wickets,
            'total_universities' => $total_universities,
            'highest_run_scorer' => $highest_run_scorer_details,
            'highest_wicket_taker' => $highest_wicket_taker_details,
            'batsman' => $batsman,
            'bowler' => $bowler,
            'all_rounder' => $all_rounder,
            'universities' => $universities,
        ]);
    }
}
