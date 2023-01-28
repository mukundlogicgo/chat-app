

const BASE_URL = "http://localhost:5000"

let currentUserId = "63d5134d5e9a77aa411d82f2"
let selectedUserId = ""

let chatId = ""
let chatUsers = []
let userMessages = []


let addUserInput = document.getElementById("user-input")
let addUserButton = document.getElementById("add-user-btn")
let mynameDiv = document.getElementById("myname")
let activeConversationSpan = document.getElementById("active-conversation-number")
let userChatsDiv = document.getElementById("user-chats")
let messageContainer = document.getElementById("message-container")

let sendMessageDiv = document.getElementById("send-message-div")
let messageInput = document.getElementById("message-input")
let sendMessageButton = document.getElementById("send-msg-btn")



const handleSendMessage = () => {
    const userMessage = messageInput.value
    if (!userMessage) return

    fetch(`${BASE_URL}/message`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            chatId: chatId,
            senderId: currentUserId,
            text: userMessage
        })
    }).then(msgResObj => msgResObj.json())
        .then(data => {
            messageInput.value = ""
            renderMessages(selectedUserId)
        })

}

const handleSelectedUser = (userId) => {
    selectedUserId = userId
    sendMessageDiv.style.display = 'flex'
    renderMessages(selectedUserId)
}

const renderChats = () => {
    fetch(`${BASE_URL}/chat/${currentUserId}`)
        .then(resObj => resObj.json())
        .then(chats => {
            userChatsDiv.innerHTML = ""
            activeConversationSpan.innerText = chats.length
            chats.map(chat => {
                const chatUserId = chat.members.find(userId => userId !== currentUserId)
                fetch(`${BASE_URL}/user/${chatUserId}`)
                    .then(resObj => resObj.json())
                    .then(user => {
                        chatUsers.push(user)
                        userChatsDiv.innerHTML += `
                        <button onclick="handleSelectedUser('${user._id}')" class="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
                            <div class="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                H
                            </div>
                            <div class="ml-2 text-sm font-semibold">${user.username}</div>
                        </button>`

                    })
                    .catch(error => alert(error.message))
            })
        })

}

const renderMessages = (selectedUserId) => {
    fetch(`${BASE_URL}/chat/find/${currentUserId}/${selectedUserId}`)
        .then(chatResObj => chatResObj.json())
        .then(chat => {
            chatId = chat._id
            fetch(`${BASE_URL}/message/${chatId}`)
                .then(msgResObj => msgResObj.json())
                .then(messages => {
                    messageContainer.innerHTML = ""
                    messages.map(message => {
                        if (message.senderId === currentUserId) {
                            return messageContainer.innerHTML += `
                            <div class="col-start-1 col-end-8 p-3 rounded-lg">
                                <div class="flex flex-row items-center">
                                    <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                        A
                                    </div>
                                    <div class="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
                                        <div>
                                            ${message.text}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
                        } else {
                            return messageContainer.innerHTML += `
                            <div class="col-start-6 col-end-13 p-3 rounded-lg">
                            <div class="flex items-center justify-start flex-row-reverse">
                                <div class="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                    A
                                </div>
                                <div class="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">
                                    <div>
                                       ${message.text}
                                    </div>
                                </div>
                            </div>
                        </div>
                        `
                        }
                    })
                })
        })






}

const main = () => {

    if (!currentUserId) return
    fetch(`${BASE_URL}/user/${currentUserId}`)
        .then(resObj => resObj.json())
        .then(user => {
            mynameDiv.innerText = user.username
        })

    addUserButton.addEventListener("click", () => {
        const username = addUserInput.value
        let newUser
        if (!username) return

        // create user if not exist
        fetch(`${BASE_URL}/user`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username })
        })
            .then(resObj => resObj.json())
            .then(user => {
                // create chat between two user
                fetch(`${BASE_URL}/chat`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        senderId: currentUserId,
                        receiverId: user._id
                    })
                }).then(resObj => resObj.json())
                    .then(chat => {
                        renderChats()
                    }).catch(error => alert(error.message))
            })
            .catch(error => alert(error.message))

        addUserInput.value = ""

        if (!newUser) return
        renderChats()

    })

    renderChats()

}


main()
