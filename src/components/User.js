import React from "react";

const User = () => {
  return (
    <a href="#/" className="user d-flex active">
      <div className="user-img ">
        <img
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlciUyMHByb2ZpbGV8ZW58MHx8MHx8&w=1000&q=80"
          alt="user"
        />
        <span className=""></span>
      </div>
      <div className="user-info">
        <h5>John Doe</h5>
        <p>Hey there! I am ...</p>
      </div>
    </a>
  );
};

export default User;
