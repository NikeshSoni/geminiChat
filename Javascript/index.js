const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;

//  create a new message element and return it..

const createMessageElement = (content, className) => {
    const divTag = document.createElement("div");
    divTag.classList.add("message", className);
    divTag.innerHTML = content;

    return divTag
}

const handleOutgoingChat = () => {
    userMessage = typingForm.querySelector(".typing-input").value.trim()

    if (!userMessage) return // exit if no message 

    const htmlCode = `
            <div class="message-content d-flex gap-3 mt-3">
                <img src="./images/user.jpg" alt="User Image" class="avatar">
                <p class="text p-0 m-0"> </p>
            </div>
    `;

   const outGoingMessageDiv = createMessageElement(htmlCode, "outgoing");
   outGoingMessageDiv.querySelector(".text").innerText = userMessage
   chatList.appendChild(outGoingMessageDiv);
}

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleOutgoingChat();

})