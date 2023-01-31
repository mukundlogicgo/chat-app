import React, { useEffect, useState } from "react";
import { saveAs } from 'file-saver'

const Message = ({ isSelf, message, currentUser, slectedChatUser }) => {

  const handleDownload = (fileUrl, filename) => {
    saveAs(fileUrl, filename)
  }

  return (

    <>
      {isSelf ? (
        <div className="col-start-1 col-end-8 p-3 rounded-lg">
          <div className="flex flex-row items-center">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              {
                slectedChatUser?.username?.charAt(0).toUpperCase()
              }
            </div>
            <div className="relative ml-3 text-sm bg-white py-2 px-4 shadow rounded-xl">
              {
                message.messageType === "mp3" && <audio src={message.text} controls autoPlay={false} />
              }
              {
                message.messageType !== "mp3" && message.messageType !== "png" &&
                < div onClick={() => handleDownload(message.text, message.text.split("/")[message.text.split("/").length - 1])} className="cursor-pointer"> {message.text}</div>
              }
              {
                message.messageType === "png" &&
                <img
                  onClick={() => handleDownload(message.text, message.text.split("/")[message.text.split("/").length - 1])}
                  className="object-cover w-full lg:w-40 lg:h-40"
                  src={message.text}
                  alt="image"
                />
              }
            </div>
          </div>
        </div>
      ) : (
        <div className="col-start-6 col-end-13 p-3 rounded-lg">
          <div className="flex items-center justify-start flex-row-reverse">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
              {
                currentUser.username.charAt(0).toUpperCase()
              }
            </div>
            <div className="relative mr-3 text-sm bg-indigo-100 py-2 px-4 shadow rounded-xl">

              {
                message.messageType === "mp3" && <audio src={message.text} controls autoPlay={false} />
              }
              {
                message.messageType !== "mp3" && message.messageType !== "png" &&
                < div onClick={() => handleDownload(message.text, message.text.split("/")[message.text.split("/").length - 1])} className="cursor-pointer"> {message.text}</div>
              }

              {
                message.messageType === "png" &&

                <img
                  onClick={() => handleDownload(message.text, message.text.split("/")[message.text.split("/").length - 1])}
                  className="object-contain w-full lg:w-40 lg:h-30"
                  src={message.text}
                  alt="image"
                />

              }

            </div>
          </div>
        </div>
      )
      }
    </>
  );
};

export default Message;
