import "./chatList.css"
import { Search } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddUser from './addUser/addUser';
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const ChatList = () => {
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)

  const {currentUser} = useUserStore()

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), (doc) => {
      setChats(doc.data())
    });

    return () => {
      unSub()
    }
  }, [currentUser.id])

  console.log(chats)

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <Search />
          <input type="text" placeholder="Search Users" />
        </div>
        <div 
          className={`add ${addMode ? 'active' : ''}`}
          onClick={() => setAddMode((prev => !prev))}
        >
          {addMode ? <Minus /> : <Plus />}
        </div>
      </div>

      {/* Chat items container */}
      <div className="chatItems">
        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>
        {addMode && <AddUser />}
      </div>
    </div>
  )
}

export default ChatList
