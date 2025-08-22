import "./addUser.css"

const addUser = () => {
  return (
    <div className="addUser">
      <form>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      <div className="user">
        <div className="detail">
          <img src="./images/avatar.jpg" alt="" />
          <span>User name</span>
        </div>
        <button>Add user</button>
      </div>
    </div>
  )
}

export default addUser
