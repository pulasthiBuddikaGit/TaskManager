// src/echo.js
// This file sets up Laravel Echo with Pusher for real-time event broadcasting.

import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '81cfba18d4281ca3104e',
  cluster: 'ap1',
  forceTLS: true,
});

export default echo;
