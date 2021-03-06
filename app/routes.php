<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the Closure to execute when that URI is requested.
|
*/
App::missing(function($exception)
{
    return View::make('papersetter');
});

Route::get('/', function()
{
	return View::make('papersetter');
});

Route::post('getTopics', array(
    'uses' => 'SelectSubjectController@postTopics'));
