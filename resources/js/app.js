import './bootstrap';

import Alpine from 'alpinejs';

window.Alpine = Alpine;

Alpine.start();

const channel = Echo.channel('chat');

channel.subscribed(() => {
    console.log('subscribed');
});
