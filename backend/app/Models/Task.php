<?php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\Builder;

class Task extends Model
{
    protected $connection = 'mongodb';
    protected $collection = 'tasks';

    protected $fillable = [
        'heading',
        'description',
        'status',
        'priority',
        'userId',
        'categoryId'
    ];

    protected $casts = [
        'userId' => 'string',
        'categoryId' => 'string',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            $model->created_at = now();
            $model->updated_at = now();
        });

        static::updating(function ($model) {
            $model->updated_at = now();
        });
    }

    protected $indexes = [
        ['key' => ['userId' => 1]],
        ['key' => ['categoryId' => 1]]
    ];
}
