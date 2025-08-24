import "./chat.css"
// import { Phone } from 'lucide-react';
// import { Video } from 'lucide-react';
import { Info } from 'lucide-react';
import { SmilePlus } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Mic } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";


const Chat = () => {
  const [chat, setChat] = useState()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const {chatId, user} = useChatStore()
  const {currentUser} = useUserStore()

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]); // Add text as dependency to trigger scroll when new messages are sent

  useEffect(() => {
    const unSub = onSnapshot (doc(db, "chats", chatId ), (res) => {
      setChat(res.data())
    } )
    return () => {
      unSub()
    }
  }, [chatId]);

  console.log(chat)


  const handleEmoji = e => {
    setText((prev) => prev + e.emoji);
    setShowEmojiPicker(false)
  }

  const handleSend = async () => {
    if (!text === "") return;

    try {
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        })
      });

      const userIDs = [currentUser.id, user.id]

      userIDs.forEach( async (id) => {

        const userChatRef = doc(db, "userchats", id)
        const userChatsSnapShot = await getDoc(userChatRef)

        if (userChatsSnapShot.exists()) {
          const userChatsData = userChatsSnapShot.data()

          const chatIndex = userChatsData.chats.findIndex(c=> c.chatId === chatId)

          userChatsData.chats[chatIndex].lastMessage = text
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true: false
          userChatsData.chats[chatIndex].updatedAt = Date.now()

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          })
        }

      })

    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="chat">
      
      <div className="top">
        <div className="user">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <span>User Name</span>
            <p>my name is minthetnaung</p>
          </div>
        </div>
        <div className="icons">
          {/* <Phone />
          <Video /> */}
          <Info size={20} />
        </div>
      </div>

      <div className="center">

        { chat?.messages?.map((message) => (
          <div className="message own" key={message?.createdAt}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              <p>{message.text}</p>
              {/* <span> {message} </span> */}
            </div>
          </div>
        ))}
        

        {/* Add this line to fix auto-scroll */}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <ImagePlus size={20} />
          <Camera size={20} />
          <Mic size={20} />
        </div>
        <input 
        type="text" 
        placeholder="Type a message" 
        value={text}
        onChange={(e) => setText(e.target.value)} />
        <div className="emoji" >
          <SmilePlus size={20} onClick={() => setShowEmojiPicker ((prev) => !prev)}/>
          <div className="picker">
            <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>

    </div>
  )
}

export default Chat
