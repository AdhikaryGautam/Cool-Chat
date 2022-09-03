import { useContext } from "react";
import { AuthContext } from "../context/context";

import logo from "../assets/logo.png";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { RiLogoutBoxRLine, RiMessage3Line } from "react-icons/ri";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

const Sidebar = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const logoutHandler = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    signOut(auth).then(() => {
      console.log("Logged Out");
    });
  };
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <img src={logo} alt="Logo" className="logo" />
      </div>
      <div className="sidebar-body">
        <div className="sidebar-item active">
          <a href="#">
            <AiOutlineUsergroupDelete />
          </a>
        </div>
        <div className="sidebar-item ">
          <a href="#">
            <RiMessage3Line />
          </a>
        </div>
      </div>
      <div className="sidebar-footer">
        <div className="sidebar-item ">
          <button onClick={logoutHandler}>
            <RiLogoutBoxRLine />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
