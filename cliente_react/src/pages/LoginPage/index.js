import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router"

import { AuthContext } from "../../store/contexts";

import "./LoginPage.css"

const LoginPage = () => {
  const navigate = useNavigate()

  const [emailField, setEmailField] = useState();
  const [passwordField, setPasswordField] = useState();

  const Auth = useContext(AuthContext);

  useEffect(() => {
    if (Auth.currentUser) {
      navigate("/");
    }
  }, [])

  const handleSubmit = async (evt) => {
    evt.preventDefault();

    debugger;

    try {
      const requestBody = {
        email: emailField,
        password: passwordField,
      };

      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      })

      if (response.status == 200) {
        const userData = await response.json();
        Auth.setCurrentUser(userData);
        navigate("/");
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="container d-flex flex-column login-form-container">
      <div className="row align-items-center">
        <div className="col"></div>
        <div className="col card">
          <form className="card-body" onSubmit={handleSubmit}>
            <h1 className="card-title text-center mb-2">Login</h1>
            <div class="form-group mb-2">
              <label for="emailInput">Email</label>
              <input
                type="email"
                id="emailInput"
                placeholder="Email"
                class="form-control"
                onChange={evt => setEmailField(evt.target.value)}
              />
            </div>

            <div class="form-group mb-3">
              <label for="passwordInput">Senha</label>
              <input
                type="password"
                id="passwordInput"
                placeholder="Senha"
                class="form-control"
                onChange={evt => setPasswordField(evt.target.value)}
              />
            </div>

            <button type="submit" class="btn btn-primary">Entrar</button>
          </form>
        </div>
        <div className="col"></div>
        </div>
    </div>
  );
}

export default LoginPage
