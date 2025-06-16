<?php

namespace App\Events;

use App\Models\Task;
use Illuminate\Broadcasting\Channel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Queue\SerializesModels;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;

class TaskDeleted implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $taskId;

    public function __construct(string $taskId)
    {
        $this->taskId = $taskId;
    }

    public function broadcastOn()
    {
        return new Channel('tasks');
    }

    public function broadcastAs()
    {
        return 'task.deleted';
    }
}
