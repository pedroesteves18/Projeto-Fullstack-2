import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import CitiesListPage from "../pages/CitiesListPage";
import CitiesRegistrationPage from "../pages/CitiesRegistrationPage";

const routes = [
  { name: "Home Page", path: "/", element: HomePage },
  { name: "Login Page", path: "/login", element: LoginPage },
  { name: "Cities Search Page", path: "/cities", requireAuth: true, element: CitiesListPage },
  { name: "Cities Register Page", path: "/cities/new", requireAuth: true, element: CitiesRegistrationPage },
];

export default routes;
