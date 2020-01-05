<?php

Route::get('/', 'HomeController@index')->name('home');
Route::post('/execute', 'HomeController@execute')->name('execute');
