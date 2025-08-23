import List from "./components/list/List"
import Detail from "./components/detail/detail"
import Chat from "./components/chat/chat"
import Login from "./components/login/Login"
import Notification from "./components/notification/Notification"
import { onAuthStateChanged } from "firebase/auth"
import { useEffect } from "react"
import { auth } from "./lib/firebase"

const App = () => {
  const user = false;

  // check if user is logged in
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user)
    });

    return () => {
      unSub()
    }
  }, [])
  
  return (
    <div className="container">
      {user ? (
        <>
          <List />
          <Chat />
          <Detail />
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  )
}

export default App
