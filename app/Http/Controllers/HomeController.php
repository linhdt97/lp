<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\User;
use Illuminate\Http\Request;
use DB;

class HomeController extends Controller
{
	public function index()
	{
	    DB::enableQueryLog();
	    User::select('email', 'name')
            ->from('users')
            ->where('name', 'Mai Sỹ Nguyên')
            ->where('email', 'LIKE', 'nguyenms%')
            ->offset(5)
            ->limit(2000)
            ->get();
	    $queryLog = DB::getQueryLog();
	    $time = $queryLog[0]['time'];
	    dd($queryLog, $time/1000);
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
