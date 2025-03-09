<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function Dashboard()
    {
        $user = auth()->user();

        if ($user->role == 'admin') {
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        $team = $user->team;
        dd($team);

    }
}
