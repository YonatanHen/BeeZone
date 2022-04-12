import logo from './logo.svg';
import './App.css';
import { Dashboard } from './dashboard';
import SignIn from './sign-in/sign-in';

function App() {
	return (
		<div>
			<div>
				<h1>Dashboard & charts goes here!</h1>
			</div>

			<Dashboard />
			{/* <SignIn /> */}
		</div>
	);
}

export default App;
