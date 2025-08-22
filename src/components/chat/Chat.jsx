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


const Chat = () => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [text, setText] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [text]); // Add text as dependency to trigger scroll when new messages are sent

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

      <div className="center">
        <div className="message own">
          <div className="texts">
            <p>Hello</p>
            <span> 1 min ago </span>
          </div>
          
        </div>

        <div className="message">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <p>Hello</p>
            <span> 1 min ago </span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <img src="https://static.wixstatic.com/media/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png/v1/fill/w_534,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png" alt="" />
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit nobis doloribus dolore? 
              Ipsa ad magnam ipsum, ab eum perferendis harum omnis illo unde in, odio placeat, autem illum 
              nesciunt nulla.</p>
            <span> 1 min ago </span>
          </div>
        </div>

        <div className="message">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nostrum est mollitia neque rem illo 
              minus. Dicta illo sit necessitatibus et ipsum fugiat quos magnam eius maiores excepturi. Odit, 
              ducimus accusantium.</p>
            <span> 1 min ago </span>
          </div>
        </div>

        <div className="message own">
          <div className="texts">
            <p>Hello</p>
            <span> 1 min ago </span>
          </div>
        </div>

        <div className="message">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <p>Hello</p>
            <span> 1 min ago </span>
          </div>
        </div>

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
        <button className="sendButton" onClick={() => setText("")}>Send</button>
      </div>

    </div>
  )
}

export default Chat
