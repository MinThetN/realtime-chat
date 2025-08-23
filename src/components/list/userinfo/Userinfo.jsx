import "./userinfo.css"
import { CircleEllipsis } from 'lucide-react';
import { Video } from 'lucide-react';
import { SquarePen } from 'lucide-react';
import { useUserStore } from "../../../lib/userStore";

const Userinfo = () => {

  const {currentUser} = useUserStore()

  return (
    <div className='userinfo'>
      <div className="user">
        <img src={currentUser.avatar || "./images/avatar.jpg"} alt="" />
        <h4>{currentUser.username}</h4>
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
