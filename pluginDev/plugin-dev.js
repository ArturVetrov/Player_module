let objMsg = [];
let chat = `
<div class="chat" id="chat-id">
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
  const place = document.querySelector("#playerChat");
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


