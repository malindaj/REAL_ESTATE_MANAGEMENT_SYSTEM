<?php

use App\Http\Controllers\Admin\AdminDashboardController;
use App\Http\Controllers\Admin\AdminPropertyController;
use App\Http\Controllers\Agent\AgentDashboardController;
use App\Http\Controllers\Agent\AgentPropertyController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageUploadController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\User\UserDashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('property', [PageController::class,'allProperties']);
Route::get('property/{id}', [PageController::class,'showProperty']);

Route::get('agent', [PageController::class,'agents']);
Route::get('agent/{id}', [PageController::class,'agentshow']);

Route::post('search', [PageController::class,'search']);
Route::post('uploads', [ImageUploadController::class,'file']);

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'

], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']);
});

//User route
Route::group([
    'middleware' =>['user','auth'],
    'prefix'=> 'user',
    'as' => 'user'
],function (){
    Route::get('profile',[UserDashboardController::class,'profile']);
    Route::post('profile',[UserDashboardController::class,'profileUpdate']);
});

//Agent Routes
Route::group([
    'middleware' => ['agent','auth'],
    'prefix' => 'agent',
    'as' => 'agent'
],function (){
    Route::get('dashboard',[AgentDashboardController::class,'index']);
    Route::get('profile',[AgentDashboardController::class,'profile']);
    Route::post('profile',[AgentDashboardController::class,'profileUpdate']);

    Route::resource('properties',AgentPropertyController::class);
});
// Admin Routes
Route::group([
    'middleware' => ['admin','auth'],
    'prefix' => 'admin',
    'as' => 'admin'
],function (){
    Route::get('dashboard',[AdminDashboardController::class,'index']);
    Route::get('profile',[AdminDashboardController::class,'profile']);
    Route::post('profile',[AdminDashboardController::class,'profileUpdate']);

    Route::resource('properties',AdminPropertyController::class);
});
