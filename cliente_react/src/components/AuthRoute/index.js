import React, { useEffect, useContext } from "react";
import { useNavigate } from "react-router";

import { AuthContext } from "../../store/contexts";

const AuthRoute = ({ children }) => {
  const navigate = useNavigate();
  const Auth = useContext(AuthContext);
  
  useEffect(() => {
    if (!Auth.currentUser) {
      navigate("/");
    }
  }, []);
  
  return (
    <React.Fragment>
      {children}
    </React.Fragment>
  )
}

export default AuthRoute;
