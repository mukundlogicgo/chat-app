import React, { useState } from 'react'
import { useEffect } from 'react'
import ChatBox from './ChatBox'
import Conversation from './Conversation'

const Chat = ({ user }) => {
  const [chats, setChats] = useState([])
  const [currentChat, setCurrentChat] = useState(null)

  const handleCurrentChat = (chat) => {
    setCurrentChat(chat)
  }

  useEffect(() => {
    const getdata = async () => {
      const resObj = await fetch(`http://localhost:5000/chat/${user._id}`)
      const chats = await resObj.json()
      setChats(chats)
    }

    getdata()
  }, [])


  return (
    <div style={{
      display: "flex",
    }} >

      {/* left side */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "30%",

      }}>
        <h2>chats</h2>
        <div>
          <input type="text" placeholder='Enter user name' />
          <button>Add</button>
        </div>
        <div >
          {
            chats.map((chat, index) => (
              <div key={index} onClick={() => handleCurrentChat(chat)}>
                <Conversation data={chat} currentUser={user} />
              </div>
            ))
          }
        </div>
      </div>

      {/* right side */}
      <div style={{
        display: "flex",
        flexDirection: "column",
        width: "70%"
      }}>
        <ChatBox chat={currentChat} currentUser={user} />
      </div>
    </div>
  )
}

export default Chat