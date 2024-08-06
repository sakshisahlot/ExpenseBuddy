import React from "react";
import { menuItems } from "../utils/menuItems";
import { signout } from "../utils/Icons";
import avatar from "../img/avatar.jpg";
import { useAuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router";

export default function Navigation({ active, setActive }) {
  const { userData, logout } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setActive(1);
    navigate("/login");
  };

  return (
    <div className="navigation">
      <div className="user-icon">
        <img src={avatar} alt="User Avatar" />
        <div className="user-details">
          <h2>{userData?.username || "Guest"}</h2>
          <p>Your Money</p>
        </div>
      </div>
      <ul className="menu-items">
        {menuItems.map((item) => {
          return (
            <li
              key={item.id}
              onClick={
                () => setActive(item.id)
                //setting the active as per the user clicked on the menu items
              }
              className={active === item.id ? "active" : ""}>
              {item.icon}
              <span>{item.title}</span>
            </li>
          );
        })}
      </ul>
      <div className="bottom-bar">
        <li onClick={handleLogout} style={{ cursor: "pointer" }}>
          {signout} Sign Out
        </li>
      </div>
    </div>
  );
}
