import "./chatList.css"
import { Search } from 'lucide-react';
import { Plus } from 'lucide-react';

const ChatList = () => {
  return (
    <div className="chatList">
      <div className="search">
        
        <div className="searchBar">
          <Search />
          <input type="text" placeholder="Search Users" />
        </div>
        <div className="add">
          <Plus />
        </div>
        

      </div>
    </div>
  )
}

export default ChatList
