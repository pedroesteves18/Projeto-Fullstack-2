import React, { useContext } from "react";
import { NavLink } from "react-router"

import { AuthContext } from "../../store/contexts";

import "./Header.css"

function Header() {
  const Auth = useContext(AuthContext)

  const handleLogout = () => {
    Auth.logout();
  }

  return (
    <nav className="navbar bg-body-tertiary header-container">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">Aplicação Frontend</NavLink>

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
