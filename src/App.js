import { Redirect, Route, Switch } from "react-router-dom";
import './App.css';
import ErrorPage from './components/404/404';
import Lobby from './components/lobby';
import { Dashboard } from './components/dashboard/dashboard';

function App() {
  return (
    <div>
        <Switch>
         <Route exact path={["/", "/lobby"]}>
           <Redirect to="/lobby#/sign-up" />
            <Lobby />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
    </div>
  );
}

export default App;
