import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router";

import routes from "./router/routes";
import Template from "./components/Template";

import AuthRoute from "./components/AuthRoute";
import { AuthContext } from "./store/contexts";

const App = () => {
  const Auth = useContext(AuthContext)

  useEffect(() => {
    const user = loadAuth()

    if (user) {
      Auth.setCurrentUser(user)
    }
  }, []);

  const loadAuth = () => {
    const userData = localStorage.getItem("Auth");

    if (userData === 'undefined') {
      return undefined
    }
    
    return JSON.parse(userData)
  };

  const handleRoutesRendering = ({ element: CurrentPage, path, requireAuth }) => {
    if (requireAuth) {
      return (
        <Route
          path={path}
          element={
            <AuthRoute>
              <CurrentPage auth={Auth} />
            </AuthRoute>
          }
        />
      )
    }

    return (
      <Route path={path} element={<CurrentPage />} />
    );
  };

  return (
    <Template>
      <Routes>
        {routes.map(handleRoutesRendering)}
      </Routes>
    </Template>
  );
};

export default App;
