const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;

//  create a new message element and return it..

const createMessageElement = (content, ...classes) => {
    const divTag = document.createElement("div");
    divTag.classList.add("message", ...classes);
    divTag.innerHTML = content;

    return divTag
}

//  show animation when api send  the Responce 
const showLoadingAnimation = () => {
    const htmlCode = `
            <div class="message-content mt-3">
                <img src="./images/gemini-image.png" alt="Gemini Image" class="avatar">
                <p class="text"> </p>
                <div class="loading-indicator">
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                    <div class="loading-bar"></div>
                </div>
            </div>
            <span class="icon material-symbols-rounded">content_copy</span>
    `;

    const incoingMessageDiv = createMessageElement(htmlCode, "outgoing", "loading");
    chatList.appendChild(incoingMessageDiv);
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

    typingForm.reset(); // clear inpput field 

    setTimeout(showLoadingAnimation, 500)
}

typingForm.addEventListener("submit", (e) => {
    e.preventDefault();

    handleOutgoingChat();

})