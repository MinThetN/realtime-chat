import "./chatList.css"
import { Search } from 'lucide-react';
import { Plus, Minus } from 'lucide-react';
import { useState } from 'react';
import AddUser from './addUser/addUser';

const ChatList = () => {
  const [addMode, setAddMode] = useState(false)
  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <Search />
          <input type="text" placeholder="Search Users" />
        </div>
        <div 
          className={`add ${addMode ? 'active' : ''}`} 
          onClick={() => setAddMode((prev => !prev))}
        >
          {addMode ? <Minus /> : <Plus />}
        </div>
      </div>

      {/* Chat items container */}
      <div className="chatItems">
        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>

        <div className="item">
          <img src="./images/avatar.jpg" alt="" />
          <div className="texts">
            <h4>User Name</h4>
            <p>Hello</p>
          </div>
        </div>
        {addMode && <AddUser />}
      </div>
    </div>
  )
}

export default ChatList
