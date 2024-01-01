<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class OrganizationCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request)
    {
        return  $this->collection->map(function ($item) {
            return [
                'id' => $item->id,
                'name' => $item->name,
                'logo' => $item->logo,
            ];
        });
    }
}
