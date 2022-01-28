import React from "react";
import { useNavigate } from "react-router";
import userICon from "../assets/img/user-icon.png";
import { auth } from "../firebase-config";
import { signOut } from "firebase/auth";
const Header = ({ user }) => {
  const navigate = useNavigate();
  const handleLogOut = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };
  return (
    <div className="header">
      <div className="profile-wrapper">
        <img src={user?.photoURL || userICon} alt="profile" />
        <h2>{`Welcome back , ${user?.name?.split(" ")[0]}`}</h2>
      </div>
      <div className="btn-wrapper">
        <button className="btn btn-logout" onClick={handleLogOut}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Header;
