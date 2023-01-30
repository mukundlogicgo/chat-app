import axios from "axios";
import React, { useState } from "react";
import SelectEmoji from "./SelectEmoji";
import SelectFileButton from "./SelectFileButton";
import SendButton from "./SendButton";


const { REACT_APP_SERVER_BASE_URL } = process.env;

const SendMessageInput = ({
  currentText,
  setCurrentText,
  setMessages,
  chatId,
  currentUser,
  slectedChat,
  setSendMessage,
}) => {


  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!currentText) return;
    console.log("message sent running...", currentText)

    const msg = {
      chatId: chatId,
      senderId: currentUser._id,
      text: currentText,
    };

    try {
      const { data: message } = await axios.post(
        `${REACT_APP_SERVER_BASE_URL}/message`,
        msg
      );
      setCurrentText("");
      setMessages((prevMessage) => [...prevMessage, message]);

      // send message to socket.
      const receiverId = slectedChat.members.find(
        (id) => id !== currentUser._id
      );
      setSendMessage({ ...message, receiverId });
      console.log("message sent successfully")
    } catch (error) {
      console.log("[ERROR]", error.message);
    }
  };
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <SelectFileButton
        handleSendMessage={handleSendMessage}
        currentText={currentText}
        setCurrentText={setCurrentText}
      />
      <div className="flex-grow ml-4">
        <div className="relative w-full">
          <input
            value={currentText}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSendMessage(e);
              }
            }}
            onChange={(e) => setCurrentText(e.target.value)}
            id="message-input"
            type="text"
            placeholder="Enter your message here...."
            className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10"
          />

          <SelectEmoji
            currentText={currentText}
            setCurrentText={setCurrentText}
          />

        </div>
      </div>

      <SendButton handleSendMessage={handleSendMessage} />
    </div>
  );
};

export default SendMessageInput;
