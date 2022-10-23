import { onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import { authService } from "../firebase";
import "antd/dist/antd.css";
import AppRouter from "./Router";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [init, setInit] = useState(false);
  const [useObj, setUserObj] = useState(null);

  useEffect(() => {
    const auth = authService;

    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
        setUserObj(user);
      } else {
        setIsLoggedIn(false);
        setUserObj(null);
      }

      setInit(true);
    });
  }, []);

  return (
    <>
      {init ? <AppRouter isLoggedIn={isLoggedIn} userObj={useObj} /> : "로딩중"}
    </>
  );
}

export default App;
