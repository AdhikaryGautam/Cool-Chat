import { RiSearch2Line } from "react-icons/ri";
import User from "./User";

const ChatList = () => {
  return (
    <div className="chat-list">
      <h5>Chat List</h5>
      <div className="search-bar">
        <input
          type="text"
          name="name"
          id="name"
          required
          placeholder="Search a conversation"
        />
        <RiSearch2Line className="form-icon" />
      </div>
      <h5>Users</h5>
      <div className="user-list">
        <User />
        <User />
        <User />
        <User />
      </div>
    </div>
  );
};

export default ChatList;
