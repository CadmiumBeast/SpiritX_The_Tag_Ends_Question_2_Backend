<?php

namespace App\Http\Controllers;

use App\Imports\PlayersImport;
use Illuminate\Http\Request;
use Maatwebsite\Excel\Facades\Excel;

class CSVController extends Controller
{
    public function upload(Request $request)
    {
        $request->validate([
            'csv_file' => 'required|mimes:csv,txt|max:2048'
        ]);

        Excel::import(new PlayersImport, $request->file('csv_file'));

        return response()->json(['message' => 'CSV Imported Successfully']);
    }
}
