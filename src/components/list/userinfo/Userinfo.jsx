import "./userinfo.css"
import { CircleEllipsis } from 'lucide-react';
import { Video } from 'lucide-react';
import { SquarePen } from 'lucide-react';

const Userinfo = () => {
  return (
    <div className='userinfo'>
      <div className="user">
        <img src='./images/avatar.jpg' alt="" />
        <h3>User Name</h3>
      </div>

      <div className="icons">
        <CircleEllipsis />
        <Video />
        <SquarePen />
      </div>
    </div>
  )
}

export default Userinfo
