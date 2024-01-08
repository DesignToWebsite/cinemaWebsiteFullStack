<?php 
namespace App\Filters;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class ReservationsFilter extends ApiFilter{

   protected $safeParams = [
         'id'=>['eq'],
         'userId'=>['eq'],
         'movieId'=>['eq'],
         'placesReserved'=>['eq'],
         'seats'=>['eq'],
         'price'=>['eq']
   ];
   protected $columnMap = [
      'userId' => 'users_id',
      'movieId' => 'movies_id',

   ];
   protected $operatorMap = [
      'eq'=>'=',
      'lt'=>'<',
      'gt'=>'>',
      'lte'=>'<=',
      'gte'=>'>=',
  ];
}