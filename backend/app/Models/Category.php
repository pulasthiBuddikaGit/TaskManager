<?php

// 1. app/Models/Category.php

namespace App\Models;

use MongoDB\Laravel\Eloquent\Model;
use MongoDB\Laravel\Eloquent\SoftDeletes;

class Category extends Model
{
    use SoftDeletes;

    protected $connection = 'mongodb';
    protected $collection = 'categories';

    protected $fillable = [
        'name',
        'userId'
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'userId');
    }
}
