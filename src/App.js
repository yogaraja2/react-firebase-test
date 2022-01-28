import "./App.css";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResponseToPost from "./pages/ResponseToPost";
import CreateChannel from "./pages/CreateChannel";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

const App = () => {
  let routes = useRoutes([
    { path: "/", element: <Login /> },
    { path: "signup", element: <Register /> },
    { path: "newChannel", element: <CreateChannel /> },
    { path: "myPost", element: <ResponseToPost /> },
  ]);
  return routes;
};

const AppWrapper = () => {
  return (
    <div className="App">
      <Router>
        <App />
      </Router>
    </div>
  );
};

export default AppWrapper;
