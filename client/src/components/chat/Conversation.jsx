import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'

const Conversation = ({ data, currentUser }) => {

    const [userData, setUserData] = useState({})

    useEffect(() => {
        const userId = data.members.find(id => id !== currentUser._id)
        const getUserdata = async () => {
            const resObj = await fetch(`http://localhost:5000/user/${userId}`)
            const user = await resObj.json()
            setUserData(user)
        }

        getUserdata()
        console.log(userId);
    }, [])

    return (
        <div style={{
            border: "1px solid black",
            padding: "4px"
        }}>{userData.username}</div>
    )
}

export default Conversation