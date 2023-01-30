import React from "react";

const UserProfile = ({ username }) => {
  return (
    <button className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2">
      <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
        {username.charAt(0).toUpperCase()}
      </div>
      <div id="myname" className="ml-2 text-sm font-semibold">
        {username}
      </div>
    </button>
  );
};

export default UserProfile;
