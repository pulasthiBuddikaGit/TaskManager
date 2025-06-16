<?php

namespace App\Models;

use Laravel\Sanctum\PersonalAccessToken as SanctumToken;
use MongoDB\Laravel\Eloquent\Model;

class PersonalAccessToken extends SanctumToken
{
    use \MongoDB\Laravel\Eloquent\HybridRelations;

    protected $connection = 'mongodb';
    protected $collection = 'personal_access_tokens';
    protected $table = 'personal_access_tokens'; // Still needed for some Sanctum operations

    // For MongoDB compatibility
    protected $keyType = 'string';
    public $incrementing = false;

    // Make sure these are properly set
    protected $fillable = [
        'name',
        'token',
        'abilities',
        'expires_at',
        'tokenable_type',
        'tokenable_id',
    ];

    protected $casts = [
        'abilities' => 'json',
        'last_used_at' => 'datetime',
        'expires_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];
}
