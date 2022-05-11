import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';

const SignIn = (props) => {
	const [email, setEmail] = useState('paul@g.com');
	const [password, setPassword] = useState('123456');
	const [submitted, setSubmitted] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const history = useHistory();

	userService.logout();

	const handleSubmit = (event) => {
		event.preventDefault();
		setSubmitted(true);

		// stop here if form is invalid
		if (!(email && password)) {
			return;
		}

		setLoading(true);

		userService.login(email, password).then(
			(user) => {
				sessionStorage.setItem('email', email);
				sessionStorage.setItem('password', password);
				// console.log(user);
				sessionStorage.setItem('name', user.displayName);

				props.setIsAuth(true);
				window.location.href = '/dashboard';
			},
			(error) => setLoading(false)
		);
	};

	return (
		<div className='formCenter'>
			<form className='formFields' onSubmit={handleSubmit}>
				<div className='formField'>
					<label className='formFieldLabel' htmlFor='email'>
						EMail Address
					</label>
					<input
						type='email'
						id='email'
						className='formFieldInput'
						placeholder='Enter your email'
						name='email'
						value={email}
						onChange={setEmail}
					/>
				</div>

				<div className='formField'>
					<label className='formFieldLabel' htmlFor='password'>
						Password
					</label>
					<input
						type='password'
						id='password'
						className='formFieldInput'
						placeholder='Enter your password'
						name='password'
						value={password}
						onChange={setPassword}
					/>
				</div>

				<div className='formField'>
					<button className='formFieldButton'>Sign In</button>{' '}
					<Link to='/' className='formFieldLink'>
						Create an account
					</Link>
				</div>
			</form>
		</div>
	);
};

export default SignIn;
