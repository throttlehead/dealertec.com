<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function() {
  return View::make('home.index');
});

Route::get('/dealerships', function() {
  return View::make('home.dealerships');
});

Route::get('/fleets', function() {
  return View::make('home.fleets');
});

Route::get('/about', function() {
  return View::make('home.about');
});

Route::get('/careers', function() {
  return View::make('home.careers');
});

Route::get('/services/detail', function() {
  return View::make('services.detail');
});

Route::get('/services/paint', function() {
  return View::make('services.paint');
});

Route::get('/services/wind', function() {
  return View::make('services.wind');
});

Route::get('/services/plastic', function() {
  return View::make('services.plastic');
});

Route::get('/services/headlight', function() {
  return View::make('services.headlight');
});