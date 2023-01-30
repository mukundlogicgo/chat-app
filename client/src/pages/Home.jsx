import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import AddNewUser from "../components/AddNewUser";
import Chat from "../components/Chat";
import Message from "../components/Message";
import SendMessageInput from "../components/SendMessageInput";
import UserProfile from "../components/UserProfile";
import { io } from "socket.io-client";
import { useRef } from "react";

const { REACT_APP_SERVER_BASE_URL, REACT_APP_SOCKET_SERVER_BASE_URL } =
  process.env;

export const socket = io(`${REACT_APP_SOCKET_SERVER_BASE_URL}`);

const Home = ({ username }) => {
  const [currentUser, setCurrentUser] = useState({});
  const [slectedChat, setSlectedChat] = useState({});
  const [slectedChatUser, setSlectedChatUser] = useState({});

  const [chatId, setChatId] = useState("");
  const [chats, setChats] = useState([]);

  const [messages, setMessages] = useState([]);
  const [sendMessage, setSendMessage] = useState({});
  const [currentText, setCurrentText] = useState("");

  const [onlineUsers, setOnlineUsers] = useState([]);

  const scrollDivRef = useRef();

  const handleSetChatId = (chatId) => {
    setChatId(chatId);
  };

  useEffect(() => {
    scrollDivRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // socket init and send current user to socket server
  useEffect(() => {
    currentUser?.username && socket.emit("new-user-add", currentUser._id);

    socket.on("get-users", (users) => {
      setOnlineUsers(prevUsers => [
        ...users
      ]);
    });

    socket.on("connect_error", (err) => {
      console.log(`connect_error due to ${err.message}`);
    });

    return () => {
      socket.off("connect_error");
      socket.off("get-users");
    };
  }, [currentUser]);

  //  get all messages by chatId
  useEffect(() => {
    chatId &&
      (async () => {
        try {
          const { data: messages } = await axios.get(
            `${REACT_APP_SERVER_BASE_URL}/message/${chatId}`
          );
          setMessages(messages);
        } catch (error) {
          console.log("[ERROR]", error?.response?.data);
        }
      })();
  }, [chatId]);

  // get user by username and find all chats
  useEffect(() => {
    (async () => {
      try {
        // get current user by username
        const { data: currentUser, status } = await axios.get(
          `${REACT_APP_SERVER_BASE_URL}/user/name/${username}`
        );
        setCurrentUser(currentUser);

        // get user chats by user id
        const { data: chats } = await axios.get(
          `${REACT_APP_SERVER_BASE_URL}/chat/${currentUser._id}`
        );
        setChats(chats);
      } catch (error) {
        console.log("[ERROR]", error?.response?.data);
      }
    })();
  }, []);

  // receiving message from user
  useEffect(() => {
    socket.on("receive-message", (data) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...data,
        },
      ]);
    });

    return () => {
      socket.off("receive-message");
    };
  }, []);

  // sending message to user
  useEffect(() => {
    if (sendMessage?.text) {
      socket.emit("send-message", sendMessage);
    }
  }, [sendMessage]);

  return (
    <div>
      <div className="flex h-screen w-full antialiased text-gray-800">
        <div className="flex flex-row h-full w-full overflow-x-hidden">
          <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
            <UserProfile username={username} />
            <AddNewUser currentUser={currentUser} setChats={setChats} />

            <div className="flex flex-col mt-8 overflow-y-auto">
              <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span
                  id="active-conversation-number"
                  className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full"
                >
                  0
                </span>
              </div>

              <div
                id="user-chats"
                className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto w-full h-full"
              >
                {chats.map((chat, index) => {
                  return (
                    <Chat
                      key={index}
                      chat={chat}
                      chats={chats}
                      currentUser={currentUser}
                      handleSetChatId={handleSetChatId}
                      slectedChat={slectedChat}
                      onlineUsers={onlineUsers}
                      setSlectedChat={setSlectedChat}
                      setSlectedChatUser={setSlectedChatUser}
                    />
                  );
                })}
              </div>
            </div>
          </div>
          {chatId ? (
            <div className="flex flex-col flex-auto h-full w-full  p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full w-full p-4">
                <div className="flex flex-col h-full w-full mb-4 overflow-y-auto">
                  <div className="flex flex-col h-full ">
                    <div
                      id="message-container"
                      className="grid grid-cols-12 gap-y-2"
                    >
                      {messages.map((msg, index) => {
                        const isSelf = msg.senderId !== currentUser._id;
                        return (
                          <Message
                            key={index}
                            isSelf={isSelf}
                            message={msg}
                            currentUser={currentUser}
                            slectedChatUser={slectedChatUser}
                          />
                        );
                      })}

                      {/* div for auto scroll */}
                      <div ref={scrollDivRef} />
                    </div>
                  </div>
                </div>
                <SendMessageInput
                  currentText={currentText}
                  setCurrentText={setCurrentText}
                  messages={messages}
                  setMessages={setMessages}
                  chatId={chatId}
                  currentUser={currentUser}
                  slectedChat={slectedChat}
                  sendMessage={sendMessage}
                  setSendMessage={setSendMessage}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-auto h-full w-full  p-6">
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full w-[80%] mb-4 overflow-y-auto">
                  <div className="flex flex-col h-full ">
                    <div
                      id="message-container"
                      className="w-full h-full flex items-center justify-center text-5xl text-gray-300 font-semibold"
                    >
                      Select user
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
