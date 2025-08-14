import List from "./components/list/List"
import Detail from "./components/detail/detail"
import Chat from "./components/chat/chat"

const App = () => {
  return (
    <div className="container">
      <List />
      <Chat />
      <Detail />
    </div>
  )
}

export default App
