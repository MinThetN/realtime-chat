import "./chatList.css"
import { Search } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddUser from './addUser/AddUser';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";

const ChatList = () => {
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)

  const {currentUser} = useUserStore()

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
      const items = res.data().chats; // Fixed: added ()

      const promises = items.map( async (item) => {
        const UserDocRef = doc(db, "users", item.receiverId);
        const UserDocSnap = await getDoc(UserDocRef);

        const user = UserDocSnap.data()

        return {...item, user}
      })

      const chatData = await Promise.all(promises)
      setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt)) // Fixed: updatedAt
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
      {chats.map((chat) => (
          <div className="item" key={chat.chatId}>
            <img src={chat.user.avatar || "./images/avatar.jpg"} alt="" />
            <div className="texts">
              <h4>{chat.user.username}</h4>
              <p>{chat.lastMessage || "No messages yet"}</p>
            </div>
          </div>
        ))}
        {addMode && <AddUser />}

    </div>
  )
}

export default ChatList
