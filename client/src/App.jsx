import { useEffect } from "react";
import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";



function App() {
  const [username, setUsername] = useState("");

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
