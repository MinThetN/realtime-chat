import "./chat.css"
// import { Phone } from 'lucide-react';
// import { Video } from 'lucide-react';
import { Info } from 'lucide-react';

const chat = () => {
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
          <Info />
        </div>
      </div>

      <div className="center"></div>
      <div className="bottom"></div>
    </div>
  )
}

export default chat
