<?php 
namespace App\Filters;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class MoviesFilter extends ApiFilter{

   protected $safeParams = [
         'id'=>['eq'],
         'name'=>['eq','contains'],
         'day'=>['eq','contains'],
         'time'=>['eq','contains'],
         'salle'=>['eq','contains'],
         'actors'=>['contains','eq'],
         'category'=>['contains','eq'],
         'year'=>['eq','contains'],
         'top'=>['eq'],
         'age'=>['eq','contains'],
         'price'=>['eq']
   ];
//    http://127.0.0.1:8000/api/movies?age[eq]=18%2B ===> 18+
//    http://127.0.0.1:8000/api/movies?actors[contains]=Nina%20Morar,%20Miss
   protected $operatorMap = [
      'contains' => 'like',
      'eq'=>'=',
      'lt'=>'<',
      'gt'=>'>',
      'lte'=>'<=',
      'gte'=>'>=',
  ];
}