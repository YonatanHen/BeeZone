import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import {
	BrowserRouter as Router,
	NavLink,
	Link,
	Route,
} from 'react-router-dom';
import SignIn from './auth/sign-in';
import SignUp from './auth/sign-up';
import { Dashboard } from './dashboard/dashboard';
import './lobby.css';

const Lobby = ({ setIsAuth }) => {
	return (
		<Router>
			<div className='signIn'>
				<div className='appAside' />
				<div className='appForm'>
					<div className='pageSwitcher'>
						<NavLink
							to='/sign-in'
							activeClassName='pageSwitcherItem-active'
							className='pageSwitcherItem'
						>
							Sign In
						</NavLink>
						<NavLink
							exact
							to='/sign-up'
							activeClassName='pageSwitcherItem-active'
							className='pageSwitcherItem'
						>
							Sign Up
						</NavLink>
					</div>
					<div className='formTitle'>
						<Link
							to='/sign-in'
							activeClassName='formTitleLink-active'
							className='formTitleLink'
						>
							Sign In
						</Link>{' '}
						or{' '}
						<NavLink
							exact
							to='/sign-up'
							activeClassName='formTitleLink-active'
							className='formTitleLink'
						>
							Sign Up
						</NavLink>
					</div>

					<Route
						path='/sign-up'
						component={() => <SignUp setIsAuth={setIsAuth} />}
					/>
					<Route
						exact
						path='/sign-in'
						component={() => <SignIn setIsAuth={setIsAuth} />}
					/>
				</div>
			</div>
		</Router>
	);
};

export default Lobby;
