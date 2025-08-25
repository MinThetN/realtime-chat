import "./detail.css"
import { ArrowDown, ArrowUp } from 'lucide-react';
import { Download } from 'lucide-react';
import { auth } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const Detail = () => {

  const { user } = useChatStore()

  return (
    <div className="detail">
      <div className="user">
        <img src={user?.avatar || "./images/avatar.jpg"} alt="" />
        <h2>{user?.username}</h2>
        <p>{user?.email}</p>
      </div>

      <div className="info">
        
        <div className="option">
          <div className="title">
            <span>Chat setting</span>
            <ArrowUp className="icon" size={18}/>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <ArrowUp className="icon" size={18}/>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <ArrowDown className="icon" size={18} />
          </div>
          <div className="photos">
            {/* photo items */}
            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://static.wixstatic.com/media/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png/v1/fill/w_534,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png" alt="" />
                <span>2023-01-01</span>
              </div>
              <Download size={18}/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://static.wixstatic.com/media/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png/v1/fill/w_534,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png" alt="" />
                <span>2023-01-01</span>
              </div>
              <Download size={18}/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="https://static.wixstatic.com/media/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png/v1/fill/w_534,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png" alt="" />
                <span>2023-01-01</span>
              </div>
              <Download size={18}/>
            </div>
            {/* photo items */}
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <ArrowUp className="icon" size={18}/>
          </div>
        </div>
        
        <button className="logout" onClick={() => auth.signOut()}>Log Out</button>

      </div>
    </div>
  )
}

export default Detail
