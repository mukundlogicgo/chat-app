import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Cookies from 'universal-cookie';


function App() {
  const [username, setUsername] = useState(null);
  const cookie = new Cookies()

  useEffect(() => {
    const foundUsername = cookie.get("username")

    if (!foundUsername) {
      username && cookie.set("username", username)
    }

    setUsername(foundUsername)

  }, [username])


  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            username ? (
              <Home username={username} setUsername={setUsername} />
            ) : (
              <Login username={username} setUsername={setUsername} />
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
