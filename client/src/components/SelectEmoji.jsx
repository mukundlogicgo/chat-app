import React, { useState } from "react";
import EmojiPicker from 'emoji-picker-react';

const SelectEmoji = ({ currentText, setCurrentText }) => {

  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  const onEmojiClick = (emoji) => {
    if (!emoji?.emoji) return
    setCurrentText(currentText + emoji.emoji)
  }

  const closeEmojiPicker = () => {
    setShowEmojiPicker(false)
  }

  return (
    <div className="realative">
      {
        !showEmojiPicker ? <button onClick={() => setShowEmojiPicker(true)} className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </button > :
          <button onClick={closeEmojiPicker} className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600 ">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z" />
            </svg>
          </button>
      }
      {
        showEmojiPicker && <div className="absolute bottom-10 right-0">
          <EmojiPicker
            onEmojiClick={onEmojiClick}
            lazyLoadEmojis={true}
            autoFocusSearch={false}
            searchDisabled={true}
          />
        </div>
      }




    </div>
  );
};

export default SelectEmoji;
