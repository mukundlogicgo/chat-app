import React, { useRef, useState } from "react";
import ConfirmationPopUp from "./FileUpload/ConfirmationPopUp";
import axios from "axios"
import { socket } from "../pages/Home";

export const { REACT_APP_SERVER_BASE_URL, REACT_APP_SOCKET_SERVER_BASE_URL } =
  process.env;

const SelectFileButton = ({
  setMessages,
  chatId,
  currentUser,
  slectedChat,
}) => {
  const [files, setFiles] = useState()

  const inputFile = useRef(null)

  const handleFileUpload = async () => {
    try {
      const receiverId = slectedChat.members.find(
        (id) => id !== currentUser._id
      );

      const formData = new FormData();

      for (let i = 0; i < files.length; i++) {
        formData.append("files", files[i]);
      }

      setFiles(null)

      const { data } = await axios.post(`${REACT_APP_SERVER_BASE_URL}/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })

      data.data.forEach(async (el) => {
        const messageType = el.filename.split(".")[el.filename.split(".").length - 1]

        const msg = {
          chatId: chatId,
          senderId: currentUser._id,
          text: `${el.filename}:${el.fileURL}`,
          messageType
        };

        const { data: message } = await axios.post(
          `${REACT_APP_SERVER_BASE_URL}/message`,
          msg
        );

        setMessages((prevMessage) => [
          ...prevMessage,
          message
        ]);

        // send message to socket.
        socket.emit("send-message", { ...message, receiverId });
      });

      setFiles(null)

    } catch (error) {
      setFiles(null)
      console.log("[ERROR]", error.message);
    }
  }

  const handleFileChange = (e) => {
    setFiles(null)
    setFiles(e.target.files)
  }

  const handleSelectFileClick = (e) => {
    inputFile.current.click();
  }


  return (
    <>
      <input
        type='file'
        ref={inputFile}
        className="hidden"
        onChange={handleFileChange}
        multiple={true}
      />
      <button onClick={handleSelectFileClick} className="flex items-center justify-center text-gray-400 hover:text-gray-600">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
          ></path>
        </svg>
      </button>

      {
        files?.length > 0 && <ConfirmationPopUp
          setFiles={setFiles}
          handleFileUpload={handleFileUpload}
        />
      }
    </>
  );
};

export default SelectFileButton;
