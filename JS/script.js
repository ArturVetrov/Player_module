const input = document.querySelector("#message-text");
const butnPush = document.querySelector("#button-push");
const btnPlay = document.querySelector(".player");
const msgScreen = document.querySelector("#messages-screen");
const chatMsg = document.querySelector(".chat-messages")

let objMsg = [];

recoverChat();

function recoverChat() {
  if (localStorage.length !== 0) { objMsg = JSON.parse(localStorage.getItem("msgStrg")) };//
  if (document.getElementById("message") == null || objMsg.length > 0) {
    for (let i = 0; i < objMsg.length; i++) {
      msgScreen.innerHTML += `<p id="message">User: ${objMsg[i]}</p>`
    }
  }
};

butnPush.addEventListener("click", (event) => {
  event.preventDefault();
  objMsg.push(input.value);
  msgScreen.innerHTML += `<p id="message">User: ${objMsg.at(-1)}</p>`
  localStorage.setItem("msgStrg", JSON.stringify(objMsg));
  chatMsg.scrollBy(0, 40);
  input.value = "";
});


btnPlay.addEventListener("click", () => {
  document.getElementById("chat-id").style.display = "block";
  chatMsg.scrollBy({
    top: window.innerHeight,
    left: 0,
    behavior: 'smooth' //плавно
  })
});

