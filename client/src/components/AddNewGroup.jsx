import axios from "axios";
import React, { useState } from "react";

const { REACT_APP_SERVER_BASE_URL } = process.env;

const AddNewGroup = ({ currentUser, groups, setGroups }) => {
  const [newGroupName, setNewGroupName] = useState("");

  const handleCreateNewChat = async (e) => {
    e.preventDefault();
    if (!newGroupName.trim()) {
      alert("Group name is required.");
      return;
    }
    try {
      // check group is exist on db or not
      const { data: group } = await axios.get(
        `${REACT_APP_SERVER_BASE_URL}/chat/group/name/${newGroupName}`
      );

      // add user to group
      const { data: userAddedGroup } = await axios.post(
        `${REACT_APP_SERVER_BASE_URL}/chat/group/user`,
        {
          name: group.name,
          userId: currentUser._id,
        }
      );

      setNewGroupName("");
      setGroups((prevGroups) => [...prevGroups, userAddedGroup]);
    } catch (error) {
      setNewGroupName("");
      alert(error.response.data);
      console.log("[ERROR]", error.message);
    }
  };
  return (
    <div className="flex w-full">
      <input
        value={newGroupName}
        onChange={(e) => setNewGroupName(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleCreateNewChat(e);
          }
        }}
        className=" w-90% shadow appearance-none border rounded w-full mt-2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id="user-input"
        type="text"
        placeholder="Groupname"
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

export default AddNewGroup;
