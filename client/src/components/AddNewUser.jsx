import axios from "axios";
import React, { useState } from "react";

const AddNewUser = ({ currentUser, setChats }) => {
  const { REACT_APP_SERVER_BASE_URL } = process.env;

  const [newUsername, setNewUsername] = useState("");

  const handleCreateNewChat = async (e) => {
    e.preventDefault();
    if (!newUsername.trim()) {
      alert("Username is required.");
      return;
    }
    try {
      // check user is exist on db or not
      const { data: user } = await axios.get(
        `${REACT_APP_SERVER_BASE_URL}/user/name/${newUsername.trim()}`
      );

      // if user exist create chat
      const { data: chat } = await axios.post(
        `${REACT_APP_SERVER_BASE_URL}/chat`,
        {
          senderId: currentUser._id,
          receiverId: user._id,
        }
      );
      setNewUsername("")
      setChats((prevChats) => [...prevChats, chat]);
    } catch (error) {
      setNewUsername("")
      alert(error.response.data)
      console.log("[ERROR]", error.message);
    }
  };
  return (
    <div className="flex w-full">
      <input
        value={newUsername}
        onChange={(e) => setNewUsername(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateNewChat(e);
          }
        }}
        className=" w-90% shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="user-input"
        type="text"
        placeholder="Username"
      />
      <button
        onClick={handleCreateNewChat}
        className="w-10% bg-indigo-500 hover:bg-indigo-600 rounded-xl text-white font-bold mt-2  py-2 px-4  focus:outline-none focus:shadow-outline"
        type="button"
      >
        Add
      </button>
    </div>
  );
};

export default AddNewUser;
