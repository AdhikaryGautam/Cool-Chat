import { useContext } from "react";
import { UserContext } from "../context/context";

import logo from "../assets/logo.png";
import { AiOutlineUsergroupDelete } from "react-icons/ai";
import { RiLogoutBoxRLine, RiMessage3Line } from "react-icons/ri";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(UserContext);
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
        <NavLink
          to="/profile"
          className={(navData) =>
            navData.isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <AiOutlineUsergroupDelete />
        </NavLink>
        <NavLink
          to="/"
          className={(navData) =>
            navData.isActive ? "sidebar-item active" : "sidebar-item"
          }
        >
          <RiMessage3Line />
        </NavLink>
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
