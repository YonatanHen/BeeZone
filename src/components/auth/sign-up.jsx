import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const SignUp = ({ setIsAuth }) => {
	const [name, setName] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [hasAgreed, setHasAgreed] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const res = await axios
			.post(
				`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZBOSJAJEyqr6uAHwxmz-IpFC8gLdErdg`,
				{
					email: email,
					password: password,
					fullName: name,
					returnSecureToken: true,
				}
			)
			.then((data) => {
				console.log('bla');
			})
			.catch((err) => {
				console.log(err);
			});
		console.log(res);
		sessionStorage.setItem('name', name);
		sessionStorage.setItem('password', password);
		sessionStorage.setItem('email', email);
		// console.log(user);

		setIsAuth(true);
		window.location.href = '/dashboard';
	};

	const handleChange = () => {
		setHasAgreed(!hasAgreed);
	};

	return (
		<div className='formCenter'>
			{/* <form className='formFields'> */}
			<div className='formField'>
				<label className='formFieldLabel' htmlFor='name'>
					Full Name
				</label>
				<input
					type='text'
					id='name'
					className='formFieldInput'
					placeholder='Enter your full name'
					name='name'
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
			</div>
			<div className='formField'>
				<label className='formFieldLabel' htmlFor='password'>
					Password
				</label>
				<input
					type='text'
					id='password'
					className='formFieldInput'
					placeholder='Enter your password'
					name='password'
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>
			</div>
			<div className='formField'>
				<label className='formFieldLabel' htmlFor='email'>
					E-Mail Address
				</label>
				<input
					type='email'
					id='email'
					className='formFieldInput'
					placeholder='example@example.com'
					name='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
			</div>

			<div className='formField'>
				<input
					className='formFieldCheckbox'
					type='checkbox'
					name='hasAgreed'
					value={hasAgreed}
					onChange={handleChange}
				/>{' '}
				<label className='formFieldCheckboxLabel'>
					I agree all statements in{' '}
				</label>
			</div>
			<div className='formField'>
				<button className='formFieldButton' onClick={handleSubmit}>
					Sign Up
				</button>{' '}
				<Link to='/sign-in' className='formFieldLink'>
					I'm already member
				</Link>
			</div>
			{/* </form> */}
		</div>
	);
};

export default SignUp;
