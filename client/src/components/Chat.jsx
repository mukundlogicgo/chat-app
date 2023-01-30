import axios from "axios";
import React, { useEffect, useState } from "react";

const Chat = ({
  chat,
  currentUser,
  handleSetChatId,
  setSlectedChat,
  onlineUsers,
  setSlectedChatUser,
}) => {
  const { REACT_APP_SERVER_BASE_URL } = process.env;

  const [user, setUser] = useState({});
  const [online, setOnline] = useState(false)

  // find freind id from chat and set user
  useEffect(() => {
    chat &&
      (async () => {
        try {

          const friendId = chat.members.find((id) => id !== currentUser._id);

          const { data: user } = await axios.get(
            `${REACT_APP_SERVER_BASE_URL}/user/${friendId}`
          );
          setUser(user);
        } catch (error) {
          console.log("[ERROR]", error?.response?.data);
        }
      })();
  }, []);

  // check is user online or not
  useEffect(() => {
    if (user.username) {
      const isOnline = onlineUsers.some(u => u.userId === user._id)
      setOnline(isOnline)
    }

  }, [onlineUsers, user])

  const handleOnSelect = async (e) => {
    e.preventDefault();
    setSlectedChat(chat);
    handleSetChatId(chat._id);

    try {
      // find selected user from db
      const { data: selectedUser } = await axios.get(`${REACT_APP_SERVER_BASE_URL}/user/${user._id}`)
      setSlectedChatUser(selectedUser)
    } catch (error) {
      alert(error.response.data)
      console.log("[ERROR]", error.message)
    }

  };

  return (
    <button
      onClick={handleOnSelect}
      className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
    >
      <div className="relative flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full ">
        <span className={`absolute w-3 h-3 rounded-full ${online ? "bg-green-400" : "bg-gray-300"} right-[-2px] bottom-0`}></span>
        {user.username && user.username.charAt(0).toUpperCase()}
      </div>
      <div id="myname" className="ml-2 text-sm font-semibold">
        {user.username}
      </div>
    </button>
  );
};

export default Chat;
