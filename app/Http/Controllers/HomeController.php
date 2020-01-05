<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
	public function index()
	{
		return view('index');
	}

	public function execute(Request $request)
    {
        return response()->json([
            'status' => 1,
            'message' => 'OK',
        ]);
    }
}
