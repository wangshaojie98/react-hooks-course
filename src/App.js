import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav, { routes } from "./Nav";
import "./style.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Nav />
        <div id="pageContainer" className="page-container">
          <Switch>
            { routes.map(([label, Component, additionalRoute = ""]) => (
              <Route
                key={label}  
                path={`/${label.replace(" ", "/")}${additionalRoute}`}
              >
                <Component />
              </Route>
            )) }
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
