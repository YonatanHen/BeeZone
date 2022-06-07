/* eslint-disable no-unused-vars */
import React, { Component, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';

const SignIn = (props) => {
	const [name, setName] = useState('test');
	const [email, setEmail] = useState('test@test.com');
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
				sessionStorage.setItem('name', name);
				sessionStorage.setItem('email', email);
				sessionStorage.setItem('password', password);
				// console.log(user);

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
						Email Address
					</label>
					<input
						type='email'
						id='email'
						className='formFieldInput'
						placeholder='Enter your email'
						name='email'
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
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
						onChange={(e) => {
							setPassword(e.target.value);
						}}
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
