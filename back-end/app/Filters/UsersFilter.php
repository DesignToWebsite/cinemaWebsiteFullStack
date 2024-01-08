<?php 
namespace App\Filters;

use Illuminate\Http\Request;
use App\Filters\ApiFilter;

class UsersFilter extends ApiFilter{

   protected $safeParams = [
         'id'=>['eq'],
         'firstName'=>['eq'],
         'lastName'=>['eq'],
         'email'=>['eq'],
         'phone'=>['eq'],
   ];
   
   protected $operatorMap = [
      'eq'=>'=',
      'lt'=>'<',
      'gt'=>'>',
      'lte'=>'<=',
      'gte'=>'>=',
  ];
}