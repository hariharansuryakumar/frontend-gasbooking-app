import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Menubar() {
  const token = localStorage.getItem("token");
  const { logout } = useContext(AuthContext);

  const handleLogout = async () => {
    await logout();
    alert("Logged out seccussfully!");
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark p-3">
        <a className="navbar-brand" href="/home">
          Great gas
        </a>

        {!token ? (
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/register">
                    Register
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/">
                    Login
                  </a>
                </li>
              </ul>
            </div>
          </>
        ):(
          <>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav">
                <li className="nav-item active">
                  <a className="nav-link" href="/home">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="/booking-list">
                    Bookings
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className="nav-link"
                    href="/"
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </>
        ) }
      </nav>
    </div>
  );
}

export default Menubar;
