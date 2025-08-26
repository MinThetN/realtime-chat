import "./chat.css"
import { Info } from 'lucide-react';
import { SmilePlus } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Mic } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import { X } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";
import { useEffect, useState, useRef } from "react";
import { arrayUnion, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import upload from "../../lib/upload";

const Chat = () => {
  const [chat, setChat] = useState()
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");
  const [img, setImg] = useState({
    file: null,
    url: "",
  })
  const [isUploading, setIsUploading] = useState(false);

  const {chatId, user} = useChatStore()
  const {currentUser} = useUserStore()

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data())
    })
    return () => {
      unSub()
    }
  }, [chatId]);

  const handleEmoji = e => {
    setText((prev) => prev + e.emoji);
    setShowEmojiPicker(false)
  }

  const handleImg = e => {
    if(e.target.files[0]){
      setImg({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0])
      })
    }
  }

  const removeImage = () => {
    setImg({
      file: null,
      url: ""
    });
  }

  const handleSend = async () => {
    if (text === "" && !img.file) return;

    setIsUploading(true);

    try {
      let imgUrl = null;
      
      // Upload image first if exists
      if (img.file) {
        imgUrl = await upload(img.file);
      }

      // Send message with both text and image (if any)
      await updateDoc(doc(db, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text: text || "",
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl })
        })
      });

      // Update user chats
      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatRef = doc(db, "userchats", id);
        const userChatsSnapShot = await getDoc(userChatRef);

        if (userChatsSnapShot.exists()) {
          const userChatsData = userChatsSnapShot.data();
          const chatIndex = userChatsData.chats.findIndex(c => c.chatId === chatId);
          
          let lastMessage = "";
          if (imgUrl && text) {
            lastMessage = `📷 ${text}`;
          } else if (imgUrl) {
            lastMessage = "📷 Image";
          } else {
            lastMessage = text;
          }
          
          userChatsData.chats[chatIndex].lastMessage = lastMessage;
          userChatsData.chats[chatIndex].isSeen = id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatRef, {
            chats: userChatsData.chats,
          });
        }
      });

    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsUploading(false);
      // Clear both image and text after sending
      setImg({
        file: null,
        url: "",
      });
      setText("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat">
      
      <div className="top">
        <div className="user">
          <img src={user?.avatar || "./images/avatar.jpg"} alt="" />
          <div className="texts">
            <span>{user?.username}</span>
            <p>{user?.email}</p>
          </div>
        </div>
        <div className="icons">
          <Info size={20} />
        </div>
      </div>

      <div className="center">
        {chat?.messages?.map((message, index) => (
          <div className={message.senderId === currentUser?.id ? "message own" : "message"} key={index}>
            <div className="texts">
              {message.img && <img src={message.img} alt="" />}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        {/* Image Preview Area */}
        {img.url && (
          <div className="image-preview">
            <div className="preview-container">
              <img src={img.url} alt="Preview" />
              <button className="remove-image" onClick={removeImage}>
                <X size={16} />
              </button>
            </div>
          </div>
        )}
        
        <div className="input-area">
          <div className="icons">
            <label htmlFor="file">
              <ImagePlus size={20} />
            </label>
            <input type="file" id="file" style={{display: "none"}} onChange={handleImg} accept="image/*" />
            <Camera size={20} />
            <Mic size={20} />
          </div>
          
          <input 
            type="text" 
            placeholder={img.url ? "Add a caption..." : "Type a message"}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={isUploading}
          />
          
          <div className="emoji">
            <SmilePlus size={20} onClick={() => setShowEmojiPicker((prev) => !prev)}/>
            <div className="picker">
              <EmojiPicker open={showEmojiPicker} onEmojiClick={handleEmoji} />
            </div>
          </div>
          
          <button 
            className="sendButton" 
            onClick={handleSend}
            disabled={isUploading || (text === "" && !img.file)}
          >
            {isUploading ? "Sending..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Chat
