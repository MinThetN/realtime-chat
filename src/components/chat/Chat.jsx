import "./chat.css"
// import { Phone } from 'lucide-react';
// import { Video } from 'lucide-react';
import { Info } from 'lucide-react';
import { SmilePlus } from 'lucide-react';
import { Camera } from 'lucide-react';
import { Mic } from 'lucide-react';
import { ImagePlus } from 'lucide-react';
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";


const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const handleEmoji = e => {
    setText((prev) => prev + e.emoji);
    setShowEmojiPicker(false)
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

      <div className="center"></div>

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
        <button className="sendButton">Send</button>
      </div>

    </div>
  )
}

export default Chat
