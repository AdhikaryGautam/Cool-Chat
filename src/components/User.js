import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/context";
import { db } from "../firebase";
import { onSnapshot, doc } from "firebase/firestore";

const User = ({ chatUser, uid }) => {
  const { selectUser, user } = useContext(UserContext);
  const [lastMessage, setLastMessage] = useState("");

  useEffect(() => {
    const docId = user.uid > uid ? user.uid + uid : uid + user.uid;
    const unsub = onSnapshot(doc(db, "lastMessage", docId), (querySnapshot) => {
      if (querySnapshot.data()) {
        setLastMessage(querySnapshot.data().message);
      }
    });
    return () => unsub();
  }, []);

  return (
    <a href="#/" className="user d-flex active" onClick={() => selectUser(uid)}>
      <div className="user-img ">
        {chatUser.photoURL ? (
          <img src={chatUser.photoURL} alt="user-img" />
        ) : (
          <div className="user-img-dummy">
            <span>{chatUser.name[0]}</span>
          </div>
        )}
        <span
          className={
            chatUser.isOnline ? "online indicator" : "offline indicator"
          }
        ></span>
      </div>
      <div className="user-info">
        <h5>{chatUser.name}</h5>
        <p>{lastMessage}</p>
      </div>
    </a>
  );
};

export default User;
