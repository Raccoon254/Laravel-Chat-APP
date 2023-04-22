import './bootstrap';
import '../css/app.css';

import Alpine from 'alpinejs';
import axios from "axios";

window.Alpine = Alpine;

Alpine.start();

let currentUser = null;

async function isLoggedIn() {
    try {
        const response = await axios.get('/user');
        if (response.data.user !== null) {
            currentUser = response.data.user;
            return true;
        } else {
            if (window.location.pathname !== '/login'&& window.location.pathname !== '/register') {
                window.location.href = '/login';
            }
            return false;
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        return false;
    }
}

isLoggedIn().then(loggedIn => {
    if (loggedIn) {
        console.log('User is logged in');
        const channel = Echo.private('private.chat.1');
        const chatMessages = document.getElementById('list-messages');
        const form = document.getElementById('form');
        form.addEventListener('submit',function (event) {
                event.preventDefault();

                const userInput = document.getElementById('message')
                const messageText = userInput.value;
                console.log(messageText)
                axios.post('/chat-message', {
                    message: messageText
                }).then((response) => {
                    console.log(response.data);
                    userInput.value = ''
                })/*.catch((error) => {
                    if (error.response) {
                        console.log('Error response data:', error.response.data);
                    } else {
                        console.log('Error:', error.message);
                    }
                });*/

            }
        )
        channel.subscribed(() => {
            console.log('subscribed');
        }).listen('.chat-message', (event) => {

            console.log(event);
            const message = event['Message'];
            const username = event['User']['name'];

            console.log(currentUser['name'])

            let userClassSide = 'chat chat-start';
            if (currentUser['name'] === username) {
                userClassSide = 'chat chat-end';
            }

            const li = document.createElement('li');
            li.innerHTML = `
                            <div class="chat-message">
                                    <div class="${userClassSide}">
                                    <div class="chat-image avatar">
                                        <div class="w-10 rounded-full">
                                            <img width="200px" src="https://api.dicebear.com/5.x/shapes/svg?flip=true&amp;seed=${username}" alt="Dp">
                                        </div>
                                    </div>
                                      <div class="chat-header text-base-content/70 text-xs">
                                            ${username}
                                        </div>
                                          <span class="chat-bubble">${message}
                                        </span>

                                    </div>
                            </div>
             `;
            chatMessages.append(li);
        })

    } else {

        console.log('User is not logged in and has been redirected to /login');
    }
});


