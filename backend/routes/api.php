<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\API\VideoController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['prefix' => 'videos', 'namespace' => 'App\Http\Controllers\API'], static function (): void {
    Route::get('search', 'VideoController@searchVideos');
    Route::get('channel/{channelId}', 'VideoController@getChannelVideos');
    Route::get('categories', 'VideoController@getCategories');
});