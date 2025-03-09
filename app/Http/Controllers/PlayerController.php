<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $userrole = auth()->user()->role;

        if ($userrole != 'admin') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $players = Player::all()->map(function ($player) {
            $points = 0;

            // Batting calculations (prevent division by zero)
            $battingStrikeRate = ($player->balls_faced > 0) ? ($player->total_runs / $player->balls_faced) * 100 : 0;
            $battingAverage = ($player->innings_played > 0) ? ($player->total_runs / $player->innings_played) : 0;

            // Bowling calculations (prevent division by zero)
            $bowlingStrikeRate = ($player->wickets > 0) ? (($player->overs_bowled * 6) / $player->wickets) : 0;
            $economyRate = ($player->overs_bowled > 0) ? (($player->runs_conceded / ($player->overs_bowled * 6)) * 6) : 0;

            // Calculate batting and bowling points
            $battingPoints = ($battingStrikeRate / 5) + ($battingAverage * 0.8);
            $bowlingPoints = ($bowlingStrikeRate > 0) ? (500 / $bowlingStrikeRate) : 0;
            $economyPoints = ($economyRate > 0) ? (140 / $economyRate) : 0;

            $points = $battingPoints + $bowlingPoints + $economyPoints;

            // Assign points to player object
            $player->points = round($points, 2);

            return $player;
        });

        return response()->json($players);
    }


    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'category' => 'required|string|in:Batsman,Bowler,All-Rounder',
            'total_runs' => 'required|numeric|min:0',
            'balls_faced' => 'required|numeric|min:0',
            'innings_played' => 'required|numeric|min:0',
            'wickets' => 'nullable|numeric|min:0',
            'overs_bowled' => 'nullable|numeric|min:0',
            'runs_conceded' => 'nullable|numeric|min:0',
        ]);

        $player = Player::create($validatedData);
        return response()->json($player, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        return response()->json(Player::findOrFail($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $player = Player::findOrFail($id);

        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'university' => 'required|string|max:255',
            'category' => 'required|string|in:Batsman,Bowler,All-Rounder',
            'total_runs' => 'required|numeric|min:0',
            'balls_faced' => 'required|numeric|min:0',
            'innings_played' => 'required|numeric|min:0',
            'wickets' => 'nullable|numeric|min:0',
            'overs_bowled' => 'nullable|numeric|min:0',
            'runs_conceded' => 'nullable|numeric|min:0',
        ]);

        $player->update($validatedData);
        return response()->json($player, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $player = Player::findOrFail($id);
        $player->delete();
        return response()->json(null, 204);
    }
}
