<?php

use Illuminate\Support\Facades\Route;
// use Illuminate\Support\Facades\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Psr\Http\Message\ServerRequestInterface;
use Symfony\Component\Console\Output\ConsoleOutput;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::post('/save', function(Request $request){

    $test = json_decode($request->getContent(),true);
    $output = new ConsoleOutput();
    $len = count($test["toSave"]);
    $output -> writeln($len);
    if($len > 0){
        for ($i = 0; $i < $len; $i++){
            DB::insert('insert into "public.Drawings" (board_id, image, posx, posy) values (?, ?, ? ,?)', [$test["toSave"][$i][0],$test["toSave"][$i][1],$test["toSave"][$i][2],$test["toSave"][$i][3]]);
        }
        return $test["toSave"][0][0];
    }
    return "bad";
    
});

Route::get('/load', function(){

    return DB::select('SELECT "board_id", "image", "posx", "posy" FROM "public.Drawings";');
});

Route::get('/{any}', function () {
    return view('app');
})->where('any', '.*');

