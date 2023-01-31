import React from "react";

import Cookies from 'universal-cookie';


const UserProfile = ({ username, setUsername, }) => {
  const cookie = new Cookies()

  const handleLogout = () => {
    cookie.remove("username")
    setUsername(null)

  }
  return (
    <button className="flex flex-row items-center justify-between cursor-default rounded-xl p-2">
      <div className="flex items-center">
        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
          {username.charAt(0).toUpperCase()}
        </div>
        <div id="myname" className="ml-2 text-sm font-semibold">
          {username}
        </div>
      </div>
      <div
        onClick={handleLogout}
        className="w-10 h-10 rounded-full flex items-center justify-center border hover:cursor-pointer" >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-log-out"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
      </div>
    </button>
  );
};

export default UserProfile;
