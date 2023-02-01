import axios from "axios";
import React, { useState } from "react";
import { socket } from "../pages/Home";
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
  const handleSendMessage = async () => {
    if (!currentText) return;

    try {
      // send message to socket.
      if (slectedChat.isGroupChat) {
        const msg = {
          chatId: chatId,
          senderName: currentUser.username,
          senderId: currentUser._id,
          text: currentText,
          isGroupChat: true,
          messageType: "text",
        };

        const { data: message } = await axios.post(
          `${REACT_APP_SERVER_BASE_URL}/message`,
          msg
        );

        setCurrentText("");
        setMessages((prevMessage) => [...prevMessage, message]);

        // get groupname to send message to that group
        const { data: group } = await axios.get(
          `${REACT_APP_SERVER_BASE_URL}/chat/group/id/${chatId}`
        );
        // sendig message to socket by groupname
        socket.emit("send-message-group", {
          ...message,
          groupName: group.name,
        });
      } else {
        const msg = {
          chatId: chatId,
          senderName: currentUser.username,
          senderId: currentUser._id,
          text: currentText,
          isGroupChat: false,
          messageType: "text",
        };

        const { data: message } = await axios.post(
          `${REACT_APP_SERVER_BASE_URL}/message`,
          msg
        );

        setCurrentText("");
        setMessages((prevMessage) => [...prevMessage, message]);
        // if chat is NOT group chat then send message to that chat
        const receiverId = slectedChat.members.find(
          (id) => id !== currentUser._id
        );

        // sendig message to socket by reciever id
        socket.emit("send-message", { ...message, receiverId });
      }
    } catch (error) {
      console.log("[ERROR]", error);
    }
  };
  return (
    <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
      <SelectFileButton
        setCurrentText={setCurrentText}
        chatId={chatId}
        currentUser={currentUser}
        setMessages={setMessages}
        slectedChat={slectedChat}
        setSendMessage={setSendMessage}
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
