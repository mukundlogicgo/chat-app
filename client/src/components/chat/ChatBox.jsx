import React, { useEffect } from 'react'
import { useState } from 'react'

const ChatBox = ({ chat, currentUser }) => {
    const [userData, setUserData] = useState(null)

    useEffect(() => {
        const userId = chat.members.find(id => id !== currentUser._id)
        
    }, [])


    return (
        <div>ChatBox</div>
    )
}

export default ChatBox