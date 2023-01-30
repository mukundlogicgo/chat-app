import axios from "axios";
import React, { useState } from "react";

const { REACT_APP_SERVER_BASE_URL, REACT_APP_SOCKET_SERVER_BASE_URL } =
  process.env;

const Login = ({ username, setUsername }) => {
  const [uname, setUname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setUsername(uname);
    try {
      const { data } = await axios.get(`${REACT_APP_SERVER_BASE_URL}/user/name/${uname}`)
      setUsername(data.username)
    } catch (error) {
      setUsername("")
      alert(error.response.data)
      console.log("[ERROR]", error.message)
    }

  };
  return (
    <div className="bg-gradient-to-tr from-fuchsia-300 to-sky-500">
      <section
        id="login"
        className="p-4 flex flex-col justify-center min-h-screen max-w-md mx-auto"
      >
        <div className="p-6 bg-sky-100 rounded">
          <form
            id="login_form"
            action="api_login"
            method="POST"
            className="flex flex-col justify-center"
          >
            <label className="text-sm font-medium">Username</label>
            <input
              value={uname}
              onChange={(e) => setUname(e.target.value)}
              className=" 
          mb-3 mt-1 block w-full px-2 py-1.5 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
          focus:outline-none
          focus:border-sky-500
          focus:ring-1
          focus:ring-sky-500
          focus:invalid:border-red-500 focus:invalid:ring-red-500"
              type="text"
              name="username"
              placeholder="Enter your name"
            />

            <button
              onClick={handleSubmit}
              className="px-4 py-1.5 rounded-md shadow-lg bg-indigo-500 hover:bg-indigo-600  text-gray-100 block transition duration-300"
              type="submit"
            >
              <span id="login_default_state">
                Submit<span id="subtotal"></span>
              </span>
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Login;
