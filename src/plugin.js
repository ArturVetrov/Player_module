import videojs from 'video.js';
import {version as VERSION} from '../package.json';


// Cross-compatibility for Video.js 5 and 6.
const registerPlugin = videojs.registerPlugin || videojs.plugin;
// const dom = videojs.dom || videojs;

/**
 * Function to invoke when the player is ready.
 *
 * This is a great place for your plugin to initialize itself. When this
 * function is called, the player will have its DOM and child components
 * in place.
 *
 * @function onPlayerReady
 * @param    {Player} player
 *           A Video.js player object.
 *
 * @param    {Object} [options={}]
 *           A plain object containing options for the plugin.
 */
const onPlayerReady = (player, options) => {
  player.addClass('vjs-chat');
};

/**
 * A video.js plugin.
 *
 * In the plugin function, the value of `this` is a video.js `Player`
 * instance. You cannot rely on the player being in a "ready" state here,
 * depending on how the plugin is invoked. This may or may not be important
 * to you; if not, remove the wait for "ready"!
 *
 * @function chat
 * @param    {Object} [options={}]
 *           An object of options left to the plugin author to define.
 */

let objMsg = [];
let chat = `
  <div class="chat-messages">
    <div class="chat-messages__content" id="messages-screen">
      
    </div>
  </div>
  <div class="chat-input">
    <form method="post" id="chat-form" style="display: flex;">
      <input type="text" class="chat-form__input" id = message-text placeholder="Введите сообщение">
      <button class="chat-form__button" id="button-push">&#8629;</button>
    </form>
  </div>
</div>`


addChat();

const input = document.querySelector("#message-text");
const btnPush = document.querySelector("#button-push");
const playing = document.querySelector(".video-js");
const msgScreen = document.querySelector("#messages-screen");
const chatMsg = document.querySelector(".chat-messages");

recoverChat();

function addChat() {
  const test = document.querySelector("#videojs-chat-player");
  test.insertAdjacentHTML('afterend', '<div class="chat" id="chat-id"></div>');
  const place = document.querySelector("#chat-id");
  place.innerHTML += chat;
}

function recoverChat() {
  if (localStorage.length !== 0) { objMsg = JSON.parse(localStorage.getItem("msgStrg")) };//
  if (document.getElementById("message") == null || objMsg.length > 0) {
    for (let i = 0; i < objMsg.length; i++) {
      msgScreen.innerHTML += `<p id="message">User: ${objMsg[i]}</p>`
    }
  }
};

btnPush.addEventListener("click", (event) => {
  event.preventDefault();
  objMsg.push(input.value);
  msgScreen.innerHTML += `<p id="message">User: ${objMsg.at(-1)}</p>`
  localStorage.setItem("msgStrg", JSON.stringify(objMsg));
  chatMsg.scrollBy(0, 40);
  input.value = "";
});

playing.addEventListener("playing", () => {
  document.getElementById("chat-id").style.display = "block";
  chatMsg.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth' //плавно
  })
});

// Register the plugin with video.js.
registerPlugin('chat', chat);

// Include the version number.
chat.VERSION = VERSION;

export default chat;
