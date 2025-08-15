import "./detail.css"
import { ArrowUp } from 'lucide-react';
import { Download } from 'lucide-react';

const detail = () => {
  return (
    <div className="detail">
      <div className="user">
        <img src="./images/avatar.jpg" alt="" />
        <h2>User Name</h2>
        <p>my name is minthetnaung</p>
      </div>

      <div className="info">
        
        <div className="option">
          <div className="title">
            <span>Chat setting</span>
            <ArrowUp size={18}/>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & Help</span>
            <ArrowUp size={18}/>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <ArrowUp size={18}/>
          </div>
          <div className="photoItem">
            <img src="https://static.wixstatic.com/media/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png/v1/fill/w_534,h_534,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/e437ed_a4f5959ca0b14e688070a227c30308f5~mv2.png" alt="" />
            <span>2023-01-01</span>
          </div>
          <Download size={18}/>
        </div>

        <div className="option">
          <div className="title">
            <span>chat setting</span>
            <ArrowUp size={18}/>
          </div>
        </div>

      </div>
    </div>
  )
}

export default detail
