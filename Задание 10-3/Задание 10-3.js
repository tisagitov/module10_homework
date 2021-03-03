/* Реализовать чат на основе эхо-сервера wss://echo.websocket.org/
Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».

При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.

1. Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат.

2. Добавить в чат механизм отправки гео-локации.

При клике на кнопку «Гео-локация» необходимо отправить данные серверу и в чат вывести ссылку/ */

const wsURL = "wss://echo.websocket.org/";

const chatWindow = document.querySelector('.chat-window');
const sendBtn = document.querySelector('.send-btn');
const geoBtn = document.querySelector('.geo-btn');
const input = document.querySelector('.input-area');

let socket = new WebSocket(wsURL);

sendBtn.addEventListener('click', sendMessage);

geoBtn.addEventListener('click', sendGeolocation);

socket.onmessage = (event) => {
    insertIntoChat(event.data, true)
}


function insertIntoChat(message, isReceived) {
    let messageHTML = `<div class="${isReceived ? "received" : "sent"}">${message}</div>`;
    chatWindow.innerHTML += messageHTML;
}

function sendMessage() {
    if (!input.value) return;
    socket.send(input.value);
    insertIntoChat(input.value, false);
    input.value === "";
  }

function sendGeolocation() {
    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(locationSuccess, locationError);
    } else {
        insertIntoChat('Ваш браузер не поддерживают функцию геолокации', false);
    }
}


function locationSuccess(data) {
    let coords = [data.coords.longitude, data.coords.latitude];
    let owURL = `https://www.openstreetmap.org/?mlat=${coords[1]}&mlon=${coords[0]}#map=13/${coords[1]}/${coords[0]}`;
    insertIntoChat(`<a href="${owURL}" target="_blank" style="color: green; text-decoration: none;">Ваша геолокация</a>`, false);
}

function locationError() {
    insertIntoChat("При определении местоположения произошла ошибка", false)
}