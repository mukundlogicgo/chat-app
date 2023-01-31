import axios from "axios";
import React, { useEffect, useState } from "react";

const { REACT_APP_SERVER_BASE_URL } = process.env;

const GroupChat = ({
    group,
    setChatId,
    setSlectedChat,
    slectedChat
}) => {
    const handleOnGroupSelect = () => {
        setChatId(group._id)
        setSlectedChat(group)
    }
    return (
        <button
            onClick={handleOnGroupSelect}
            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
        >
            <div className="relative flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full ">
                {group.name && group.name.charAt(0).toUpperCase()}
            </div>
            <div id="myname" className="ml-2 text-sm font-semibold">
                {group.name}
            </div>
        </button>
    );
}

export default GroupChat
