import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import {
	FacebookLoginButton,
	InstagramLoginButton,
} from 'react-social-login-buttons';





class SignIn extends Component {
	constructor(props) {
		super(props);

		userService.logout();

		this.state = {
			email: 'paul@g.com',
			password: '123456',
			submitted: false,
			loading: false,
			error: ''
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(event) {
		const { name, value } = event.target;
		this.setState({ [name]: value });
	}

	handleSubmit(event) {
		event.preventDefault();
		this.setState({ submitted: true });

		const { email, password, returnUrl } = this.state;

		// stop here if form is invalid
		if (!(email && password)) {
			return;
		}

		this.setState({ loading: true });
		userService.login(email, password)
			.then(
				user => {
					const { from } = this.props.location.state || { from: { pathname: "/dashboard" } };
					this.props.history.push(from);
				},
				error => this.setState({ error, loading: false })
			);
	}

	render() {
		return (
			<div className='formCenter'>
				<form className='formFields' onSubmit={this.handleSubmit}>
					<div className='formField'>
						<label className='formFieldLabel' htmlFor='email'>
							E-Mail Address
						</label>
						<input
							type='email'
							id='email'
							className='formFieldInput'
							placeholder='Enter your email'
							name='email'
							value={this.state.email}
							onChange={this.handleChange}
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
							value={this.state.password}
							onChange={this.handleChange}
						/>
					</div>

					<div className='formField'>
						<button className='formFieldButton'>Sign In</button>{' '}
						<Link to='/' className='formFieldLink'>
							Create an account
						</Link>
					</div>

					<div className='socialMediaButtons'>
						<div className='facebookButton'>
							<FacebookLoginButton onClick={() => alert('Hello')} />
						</div>

						<div className='instagramButton'>
							<InstagramLoginButton onClick={() => alert('Hello')} />
						</div>
					</div>
				</form>
			</div>
		);
	}
}


export default SignIn;