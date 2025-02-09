import { useState } from "react";

import { AuthContext } from "../../store/contexts";

const Authenticator = ({ children }) => {
  const [currentUser, setCurrentUser] = useState();

  const logout = () => {
    setCurrentUser(undefined);
    localStorage.setItem("Auth", "undefined");
  }

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
};

export default Authenticator;
