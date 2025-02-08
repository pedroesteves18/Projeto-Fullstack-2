import { Routes, Route } from "react-router";

import routes from "./router/routes";
import Template from "./components/Template";
import Authenticator from "./components/Authenticator";

const App = () => {

  return (
    <Authenticator>
      <Template>
        <Routes>
          {routes.map(({ element, path, name }) => (
            <Route path={path} element={element} />
          ))}
        </Routes>
      </Template>
    </Authenticator>
  );
};

export default App;
