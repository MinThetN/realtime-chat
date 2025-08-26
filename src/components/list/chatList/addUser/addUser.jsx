import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import "./addUser.css"
import { db } from "../../../../lib/firebase"
import { useState } from "react"
import { useUserStore } from "../../../../lib/userStore"
import { Search, UserPlus, X } from 'lucide-react'

const AddUser = ({ onClose, existingChats = [] }) => {
  const [user, setUser] = useState(null);
  const [isSearching, setIsSearching] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState("");
  const { currentUser } = useUserStore()

  const handleSearch = async (e) => {
    e.preventDefault()
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    setError("");
    const formData = new FormData(e.target)
    const username = formData.get('username')

    try {
      const userRef = collection(db, "users");
      const q = query(userRef, where("username", "==", username));
      const querySnapshot = await getDocs(q);

      if(!querySnapshot.empty) {
        const foundUser = querySnapshot.docs[0].data();
        
        // Check if user is trying to add themselves
        if (foundUser.id === currentUser.id) {
          setError("You cannot add yourself!");
          setUser(null);
          return;
        }
        
        // Check if user already exists in chat list
        const userExists = existingChats.some(chat => chat.user.id === foundUser.id);
        if (userExists) {
          setError("This user is already in your chat list!");
          setUser(null);
          return;
        }
        
        setUser(foundUser);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log(error)
      setError("An error occurred while searching. Please try again.");
    } finally {
      setIsSearching(false);
    }
  }

  const handleAddUser = async () => {
    setIsAdding(true);
    const chatRef = collection(db, "chats")
    const userChatRef = collection(db, "userchats")
    
    try {
      const newChatRef = doc(chatRef)
      
      await setDoc(newChatRef, {
        createAt: serverTimestamp(),
        message:[]
      })

      await updateDoc(doc(userChatRef, user.id), {
        chats:arrayUnion({
          chatId: newChatRef.id,
          message: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      await updateDoc(doc(userChatRef, currentUser.id), {
        chats:arrayUnion({
          chatId: newChatRef.id,
          message: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      });

      // Reset and close
      setUser(null);
      setSearchQuery("");
      setError("");
      onClose && onClose();

    } catch (error) {
      console.log(error)
      setError("Failed to add user. Please try again.");
    } finally {
      setIsAdding(false);
    }
  }

  return (
    <div className="addUser-overlay">
      <div className="addUser">
        <div className="header">
          <h2>Add New Contact</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        
        <form onSubmit={handleSearch} className="search-form">
          <div className="search-input-container">
            <Search size={18} className="search-icon" />
            <input 
              type="text" 
              placeholder="Search by username..." 
              name="username"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              disabled={isSearching}
            />
          </div>
          <button type="submit" disabled={isSearching || !searchQuery.trim()}>
            {isSearching ? "Searching..." : "Search"}
          </button>
        </form>

        {error && (
          <div className="error-message">
            <p>{error}</p>
          </div>
        )}

        {searchQuery && !user && !isSearching && !error && (
          <div className="no-results">
            <p>No user found with username "{searchQuery}"</p>
          </div>
        )}

        {user && (
          <div className="user-result">
            <div className="user-info">
              <img src={user.avatar || "./images/avatar.jpg"} alt="" />
              <div className="user-details">
                <span className="username">{user.username}</span>
                <span className="email">{user.email}</span>
              </div>
            </div>
            <button 
              className="add-btn" 
              onClick={handleAddUser}
              disabled={isAdding}
            >
              {isAdding ? (
                "Adding..."
              ) : (
                <>
                  <UserPlus size={16} />
                  Add Contact
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default AddUser
