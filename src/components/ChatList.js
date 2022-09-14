import { RiSearch2Line } from "react-icons/ri";
import User from "./User";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";

const ChatList = () => {
  const { setUser2, setIsChatLoading, chatUsers, setChatUsers } =
    useContext(UserContext);
  const [search, setSearch] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);

  const searchUser = (e) => {
    setSearch(e.target.value);
  };

  useEffect(() => {
    const tempUsers = chatUsers.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    );
    setSearchedUsers(tempUsers);
  }, [search]);

  useEffect(() => {
    const userRef = collection(db, "users");
    const q = query(userRef, where("uid", "not-in", [auth.currentUser.uid]));
    const unsub = onSnapshot(q, (querySnapshot) => {
      let tempUsers = [];
      querySnapshot.forEach((doc) => {
        tempUsers.push(doc.data());
      });
      setIsChatLoading(false);
      setChatUsers(tempUsers);
      setSearchedUsers(tempUsers);
      setUser2(tempUsers[0]);
    });
    return () => unsub();
  }, []);

  return (
    <div className="chat-list">
      <h5>Chat List</h5>
      <div className="search-bar">
        <input
          type="text"
          name="search-user"
          id="search-user"
          value={search}
          required
          placeholder="Search a conversation"
          onChange={searchUser}
        />
        <RiSearch2Line className="form-icon" />
      </div>
      <h5>Users</h5>
      <div className="user-list">
        {searchedUsers.map((chatUser) => {
          return (
            <User key={chatUser.uid} chatUser={chatUser} uid={chatUser.uid} />
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
