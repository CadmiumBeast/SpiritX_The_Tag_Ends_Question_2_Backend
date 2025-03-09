<?php

namespace App\Imports;

use App\Models\Player;
use Maatwebsite\Excel\Concerns\ToModel;

class PlayersImport implements ToModel
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    private $firstRow = true;

    public function model(array $row)
    {
        if ($this->firstRow) {
            $this->firstRow = false;
            return null; // Skip first row
        }

        return new Player([
            'name' => $row[0],
            'university' => $row[1],
            'category' => $row[2],
            'total_runs' => (double) $row[3],
            'balls_faced' => (double) $row[4],
            'innings_played' => (double) $row[5],
            'wickets' => (double) $row[6],
            'overs_bowled' => (double) $row[7],
            'runs_conceded' => (double) $row[8],
        ]);
    }
}
