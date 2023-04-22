<?php

namespace App\Events;

use App\Models\User;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ChatMessageEvent implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    private string $message;
    private User $user;

    /**
     * Create a new event instance.
     */
    public function __construct(string $message ,User $user)
    {
        $this->user = $user;
        $this->message = $message;
        // $this->dontBroadcastToCurrentUser();
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn(): array
    {
        return [
            new PrivateChannel('private.chat.1'),
        ];
    }

    public function broadcastAs(): string
    {
        return 'chat-message';
    }

    public function broadcastWith(): array
    {
        return [
            'Message' => $this->message,
            'User' => $this->user->only(['name', 'email']),
        ];
    }
}
