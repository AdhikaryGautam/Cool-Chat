import React, { useContext } from "react";
import { UserContext } from "../context/context";
import { AiFillFile, AiOutlineDownload } from "react-icons/ai";

const ChatMessage = ({ msg, user2 }) => {
  const { user } = useContext(UserContext);
  return (
    <React.Fragment>
      {msg.type === "message" && (
        <div
          className={
            msg.sender === user.uid
              ? "chat-message sent"
              : "chat-message received"
          }
        >
          {msg.sender !== user.uid && (
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
          )}
          <div className="message">
            <p>{msg.message}</p>
          </div>
        </div>
      )}

      {msg.type === "image" && (
        <div
          className={
            msg.sender === user.uid ? "file-image sent" : "file-image received"
          }
        >
          {msg.sender !== user.uid && (
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
          )}
          <img src={msg.message.url} alt="image" />
        </div>
      )}
      {msg.type !== "image" && msg.type !== "message" && (
        <div
          className={msg.sender === user.uid ? "file sent" : "file received"}
        >
          {msg.sender !== user.uid && (
            <div className="user-img">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
                alt="user"
              />
            </div>
          )}
          <div className="file-inner">
            <div className="file__icon">
              <AiFillFile />
            </div>
            <div className="file__info">
              <div className="file__name">{msg.message.name}</div>
              <div className="file__size">1.2 MB</div>
            </div>
            <a href={msg.message.url} target="_blank" rel="noreferrer">
              <AiOutlineDownload />
            </a>
          </div>
        </div>
      )}
    </React.Fragment>
  );
};

export default ChatMessage;
