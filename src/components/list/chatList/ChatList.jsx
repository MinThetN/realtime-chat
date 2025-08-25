import "./chatList.css"
import { Search } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import { useEffect, useState } from 'react';
import AddUser from './addUser/AddUser';
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";

const ChatList = () => {
  const [chats, setChats] = useState([])
  const [addMode, setAddMode] = useState(false)
  const [ input, setInput ] = useState("")

  const {currentUser} = useUserStore()
  const {changeChat} = useChatStore()

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

  const handleSelect = async (chat) => {
    
    const userChats = chats.map(item => {
      const {...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(item => item.chatId === chat.chatId);

    userChats[chatIndex].isSeen = true

    const userChatRef = doc(db, "userchats", currentUser.id);

    try {
      
      await updateDoc(userChatRef, {
        chats: userChats,
      })
      changeChat(chat.chatId, chat.user)

    } catch (error) {
      console.log(error)
    }

  }

  const filteredChats = chats.filter((c) => 
    c.user.username.toLowerCase().includes(input.toLowerCase())
);

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <Search />
          <input type="text" placeholder="Search Users" onChange={(e) => setInput(e.target.value)} />
        </div>
        <div 
          className={`add ${addMode ? 'active' : ''}`}
          onClick={() => setAddMode((prev => !prev))}
        >
          {addMode ? <Minus /> : <Plus />}
        </div>
      </div>

      {/* Chat items container */}
      {filteredChats.map((chat) => (
          <div 
          className="item" 
          key={chat.chatId} 
          onClick={() => handleSelect(chat)}
          style={{
            backgroundColor: chat?.isSeen ? 'transparent' : '#116db8',
          }}
          >
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
