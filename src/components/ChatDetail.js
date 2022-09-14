import { UserContext } from "../context/context";
import { useEffect, useState, useContext, useCallback } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { FaRegFileImage } from "react-icons/fa";

import {
  doc,
  onSnapshot,
  setDoc,
  addDoc,
  collection,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import ChatMessage from "./ChatMessage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

const ChatDetail = () => {
  const [typedMessage, setTypedMessage] = useState("");
  const [file, setFile] = useState(null);
  const {
    user,
    user2,
    message,
    setMessage,
    isChatDetailsLoading,
    setIsChatDetailsLoading,
  } = useContext(UserContext);

  const submit = async (e) => {
    const docId =
      user.uid > user2.uid ? user.uid + user2.uid : user2.uid + user.uid;
    e.preventDefault();
    setTypedMessage("");

    if (typedMessage !== "") {
      await addDoc(collection(db, "chats", docId, "chat"), {
        message: typedMessage,
        type: "message",
        createdAt: new Date(),
        sender: user.uid,
        receiver: user2.uid,
      });
      await setDoc(doc(db, "lastMessage", docId), {
        message: typedMessage,
        type: "message",
        createdAt: new Date(),
        sender: user.uid,
        receiver: user2.uid,
      });
    }
    if (file) {
      const storage = getStorage();
      const storageRef = ref(storage, `/files/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);
      const fileType = file.type.split("/")[0];
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          await addDoc(collection(db, "chats", docId, "chat"), {
            message: {
              url: downloadURL,
              name: file.name,
              type: fileType,
            },
            type: fileType,
            createdAt: new Date(),
            sender: user.uid,
            receiver: user2.uid,
          });
        }
      );
    }

    chatRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (user2) {
      const docId =
        user.uid > user2.uid ? user.uid + user2.uid : user2.uid + user.uid;
      const userRef = collection(db, "chats", docId, "chat");
      const q = query(userRef);
      const unsub = onSnapshot(q, (querySnapshot) => {
        let tempMessages = [];
        querySnapshot.forEach((doc) => {
          tempMessages.push(doc.data());
        });
        tempMessages.sort((a, b) => a.createdAt - b.createdAt);
        setMessage(tempMessages);
        setIsChatDetailsLoading(false);
      });
      return () => {
        unsub();
      };
    }
  }, [user2]);

  const chatRef = useCallback((node) => {
    if (node !== null) {
      node.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return isChatDetailsLoading ? (
    <div className="loading">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  ) : (
    <div className="chat-details">
      <div className="chat-head">
        <div className="user-img ">
          {user2.photoURL ? (
            <img src={user2.photoURL} alt="user-img" />
          ) : (
            <div className="user-img-dummy">
              <span>{user2.name[0]}</span>
            </div>
          )}
          <span
            className={
              user2.isOnline ? "online indicator" : "offline indicator"
            }
          ></span>
        </div>
        <div className="user-info">
          <h5>{user2.name}</h5>
        </div>
      </div>
      <hr />
      <div className="chat-body">
        {message.length > 0 &&
          message.map((msg, index) => {
            return <ChatMessage key={index} msg={msg} user2={user2} />;
          })}
        <div ref={chatRef}></div>
      </div>
      <div className="chat-footer">
        <form action="#/" onSubmit={submit} className="chat-input">
          <input
            type="text"
            placeholder="Type a message"
            name="typedMessage"
            id="typedMessage"
            value={typedMessage}
            onChange={(e) => setTypedMessage(e.target.value)}
          />
          <div className="file-input">
            <input
              type="file"
              name="file-input"
              id="file-input"
              className="file-input__input"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <label className="file-input__label" htmlFor="file-input">
              <span>
                <FaRegFileImage />
              </span>
            </label>
          </div>
          <button onClick={submit}>
            <RiSendPlane2Fill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatDetail;
