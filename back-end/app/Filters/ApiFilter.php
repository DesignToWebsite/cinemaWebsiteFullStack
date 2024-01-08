<?php

namespace App\Filters;

use Illuminate\Http\Request;

class ApiFilter
{
    protected $safeParams = [];
    protected $columnMap = [];
    protected $operatorMap = [];

    public function transform(Request $request)
    {
        $eloQuery = [];

        foreach ($this->safeParams as $param => $operators) {
            $query = $request->query($param);

            if (!isset($query)) {
                continue;
            }

            $column = $this->columnMap[$param] ?? $param;

            foreach ($operators as $operator) {
                if ($operator === 'contains') {
                    // Handle 'contains' condition
                    $value = is_array($query) ? '%' . implode(' ', $query) . '%' : '%' . $query . '%';
                    $eloQuery[] = [$column, $this->operatorMap[$operator], $value];

                } else {
                    // Use the specified operator
                    // $value = is_array($query) ? $query[0] : $query[$operator] ?? null;
                    if(isset($query[$operator])) {
                        $eloQuery[] = [$column, $this->operatorMap[$operator], $query[$operator]];
                    }
                }

                // if (isset($value)) {
                //     $eloQuery[] = [$column, $this->operatorMap[$operator], $value];
                // }
            }
        }

        return $eloQuery;
    }
}
