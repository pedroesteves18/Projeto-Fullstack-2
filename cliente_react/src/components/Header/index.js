import React, { useContext } from "react";
import { NavLink, useNavigate } from "react-router"

import { AuthContext } from "../../store/contexts";

import "./Header.css"

function Header() {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);

  const handleLogout = () => {
    Auth.logout();
    localStorage.setItem("Auth", "undefined");
    navigate("/");
  };

  return (
    <nav className="navbar bg-body-tertiary header-container">
      <div className="container-fluid">
        <div className="d-flex">
          <NavLink className="navbar-brand" to="/">
            Aplicação Frontend
          </NavLink>

          {Auth.currentUser && (
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink className="nav-link" to="/cities">
                  Cidades
                </NavLink>
              </li>
            </ul>
          )}
        </div>

        <div className="d-flex">
          <ul className="navbar-nav">
            {Auth.currentUser ? (
              <React.Fragment>
                <li className="nav-item">
                  <button className="nav-link" onClick={handleLogout}>
                    Sair
                  </button>
                </li>
              </React.Fragment>
            ) : (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Entrar
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div >
    </nav >
  )
}

export default Header
