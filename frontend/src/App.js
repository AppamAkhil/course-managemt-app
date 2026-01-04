import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import Courses from "./Courses";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  return (
    <div className="bg-light min-vh-100">
      {!isLoggedIn && <Register />}
      {!isLoggedIn && <Login setIsLoggedIn={setIsLoggedIn} />}
      {isLoggedIn && <Courses />}
      {isLoggedIn && (
  <button onClick={() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  }}>
    Logout
  </button>
)}

    </div>
  );
}
