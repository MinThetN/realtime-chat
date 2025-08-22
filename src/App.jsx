import List from "./components/list/List"
import Detail from "./components/detail/detail"
import Chat from "./components/chat/chat"
import Login from "./components/login/Login"

const App = () => {
  const user = false;
  
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
    </div>
  )
}

export default App
