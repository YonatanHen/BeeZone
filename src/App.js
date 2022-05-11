import {
	BrowserRouter as Router,
	Route,
	Switch,
	Redirect,
} from 'react-router-dom';
import './App.css';
import ErrorPage from './components/404/404';
import Lobby from './components/lobby';
// import ErrorPage from './components/errorPage';
import { Dashboard } from './components/dashboard/dashboard';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function App() {
	const [isAuth, setIsAuth] = useState(false);
	const history = useHistory();

	return (
		<Switch>
			<Route exact path='/'>
				<Lobby setIsAuth={setIsAuth} />
			</Route>
			<Route exact path='/dashboard'>
				<Dashboard auth={isAuth} />
			</Route>
			<Route path='*'>
				<ErrorPage />
			</Route>
		</Switch>
	);
}

export default App;
