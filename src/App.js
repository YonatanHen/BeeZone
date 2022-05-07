import {BrowserRouter as Router, Route, Switch ,Redirect} from "react-router-dom";
import './App.css';
import Lobby from './components/lobby';
import ErrorPage from './components/errorPage';
import dashboard from './components/dashboard';

function App() {
  return (
    <div>
        <Switch>
         <Route exact path={["/", "/lobby"]}>
           <Redirect to="/lobby#/sign-up" />
            <Lobby />
          </Route>
          <Route path="*">
            <ErrorPage />
          </Route>
        </Switch>
      {/* <Lobby /> */}
    </div>
  );
}

export default App;
