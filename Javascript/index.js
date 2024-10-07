const typingForm = document.querySelector(".typing-form");
const chatList = document.querySelector(".chat-list");

let userMessage = null;
const API_KEY = "AIzaSyCAd-jOTmZTLecRUcvqSEXAegaWstf4Czw";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=
${API_KEY}`;

//  create a new message element and return it..

const createMessageElement = (content, ...classes) => {
    const divTag = document.createElement("div");
    divTag.classList.add("message", ...classes);
    divTag.innerHTML = content;

    return divTag
}

//  Show Typing Effect 
const showTypingEffect = (text, textElement) => {
    const words = text.split(' ');
    let currentWordIndex = 0;

    const typingInterval = setInterval(() => {
        textElement.innerText += (currentWordIndex === 0 ? '' : ' ') + words[currentWordIndex++]

        if (currentWordIndex === words.length) {
            clearInterval(typingInterval)
        }
    }, 75)

}


// Get Api and responce 
const generateAPIResponce = async (incoingMessageDiv) => {

    const textElement = incoingMessageDiv.querySelector(".text") // get text Element 

    //  Send a Post Method 
    try {
        const responce = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: userMessage }]
                }]
            })
        })

        const data = await responce.json();
        const apiResponce = data?.candidates[0].content.parts[0].text;
        // textElement.innerText = apiResponce  
        showTypingEffect(apiResponce, textElement)
    } catch (error) {
        console.log(error);
    } finally {
        incoingMessageDiv.classList.remove("loading")
    }
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
            <span onclick="copyMessage(this)" class="icon material-symbols-rounded">content_copy</span>
    `;

    const incoingMessageDiv = createMessageElement(htmlCode, "outgoing", "loading");
    chatList.appendChild(incoingMessageDiv);

    generateAPIResponce(incoingMessageDiv);
}


 const copyMessage = (copyIcon) => {
    console.log(copyIcon);

    // const messageText = copyIcon.parentElement.querySelector(".text").innerText;
    const messageText =  copyIcon.parentElement.querySelector(".text").innerText;

    console.log(messageText);
    

    navigator.clipboard.writeText(messageText);
    copyIcon.innerText = "done";

    setTimeout( () => copyIcon.innerText = "content_copy", 1000)
     
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