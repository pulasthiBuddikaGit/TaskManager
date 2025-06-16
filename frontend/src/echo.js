// src/echo.js
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: '81cfba18d4281ca3104e',         
  cluster: 'ap1', // e.g., 'mt1'
  forceTLS: true,
  // wsHost: window.location.hostname,
  // wsPort: 6001,
  // wssPort: 6001,
  // disableStats: true,
  // enabledTransports: ['ws', 'wss'],
});

export default echo;
