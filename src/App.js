import logo from "./logo.svg";
import "./App.css";
import Login from "./pages/Login";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Dashboard from "./pages/Dashboard"
import Setup from "./pages/Setup";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Route exact path="/setup" component={Setup} />
        <Route exact path="/login" component={Login} />
		    <Route exact path="/" component={Dashboard} />
      </BrowserRouter>
    </div>
  );
}

export default App;
