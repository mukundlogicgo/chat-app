import React, { useState } from 'react'
import Chat from './chat/Chat'


const HomePage = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [user, setUser] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()

        const resObj = await fetch("http://localhost:5000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })

        const { user } = await resObj.json()
        setUser(user)


    }

    return (
        !user ? <div>
            <h1>login</h1>
            <input type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
            />
            <input type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
            />
            <button onClick={handleSubmit}>Submit</button>
        </div> :
            <Chat user={user} />
    )
}

export default HomePage