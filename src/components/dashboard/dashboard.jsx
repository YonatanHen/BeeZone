import React, { Component, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { GiTreeBeehive } from 'react-icons/gi';
import '../dashboard/dashboard.css';
import Modal from 'react-modal';

let num = 0;
const customStyles = {
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		width: '20%',
		height: '40%',
		transform: 'translate(-50%, -50%)',
		backgroundImage: "url('https://wallpaperaccess.com/full/1634369.jpg')",
		backgroundSize: 'cover',
		backgroundColor: 'rgba(255, 239, 226,1)',
		backgroundBlendMode: 'overlay',
	},
};
export const Dashboard = (props) => {
	const [ScreenshootClicked, setScreenshootClicked] = useState(false);
	const [showModal, setShowModal] = useState(false);

	const [tempData, setTempData] = useState({
		labels: [],
		datasets: [
			{
				label: 'Temperature',
				data: [],
				fill: false,
				borderColor: '#42A5F5',
				tension: 0.4,
			},
		],
	});

	const [humData, setHumData] = useState({
		labels: [],
		datasets: [
			{
				label: 'Humidity',
				data: [],
				fill: false,
				borderColor: '#42A5F5',
				tension: 0.4,
			},
		],
	});

	const [dates, setDates] = useState([]);
	const [temperatures, setTemperatures] = useState([]);
	const [humidities, setHumidities] = useState([]);
	const [clicked, setClicked] = useState(false);

	const openModal = () => {
		setShowModal(true);
	};

	const closeModal = () => {
		setShowModal(false);
	};

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios.get(`http://127.0.0.1:8000/get-data/`);
			if (response.status === 200) {
				const resData = response.data;

				setTemperatures([...temperatures, resData.temperature]);

				setHumidities([...humidities, resData.humidity]);

				setDates([...dates, resData.date]);

				setTempData({
					labels: dates,
					datasets: [
						{
							label: 'Temperature',
							fill: false,
							borderColor: '#42A5F5',
							tension: 0.4,
							data: temperatures,
						},
					],
				});

				setHumData({
					labels: dates,
					datasets: [
						{
							label: 'Humiditiy',
							fill: false,
							borderColor: 'green',
							tension: 0.4,
							data: humidities,
						},
					],
				});
				num += 1;
			} else {
				alert('bad temperature or humidity');
			}
		}, 5000);

		console.log(dates);
		console.log(temperatures);
		return () => clearInterval(interval);
	});

	const refresh = () => {
		window.location.reload(true);
	};

	function afterOpenModal() {
		// references are now sync'd and can be accessed.
		subtitle.style.color = '#fff';
	}

	let subtitle;

	return (
		<div>
			<div className='container'>
				<div className='nav-container'>
					<div className='logo-container'>
						<GiTreeBeehive className='logo' />
						<h3>SmartBee</h3>
					</div>
					<nav className='navMenu'>
						<button className='refresh-button' onClick={refresh}>
							Refresh Page
						</button>
						{/* <Link className='button' to='/dashboard'>
							Refresh Page
						</Link> */}
						<a className='button' onClick={openModal}>
							Edit Profile
						</a>
						<button
							className='button'
							onClick={() => {
								userService.logout();
								console.log('Logout');
							}}
						>
							Sign out
						</button>
						<div className='dot'></div>
					</nav>
				</div>
				<div className='cam-box'>
					{!clicked && (
						<button className='cam-button' onClick={() => setClicked(!clicked)}>
							broadcast
						</button>
					)}
					{clicked && (
						<button className='cam-button' onClick={() => setClicked(!clicked)}>
							{' '}
							Turn Off Camera{' '}
						</button>
					)}
					{clicked && <Webcam className='webcam' audio={false} />}
				</div>
				<Modal
					isOpen={showModal}
					onAfterOpen={afterOpenModal}
					onRequestClose={closeModal}
					style={customStyles}
					contentLabel='Example Modal'
				>
					<h2
						style={{
							width: '90%',
							marginLeft: '0.9rem',
							marginBottom: '1.2rem',
							backgroundColor: 'rgba(255, 224, 110,1)',
							color: 'white',
							textAlign: 'center',
							height: '3vh',
							marginBottom: '1rem',
							fontSize: '1rem',
						}}
						ref={(_subtitle) => (subtitle = _subtitle)}
					>
						EDIT PERSONAL INFORMATION
					</h2>
					{/* <button
						style={{
							// backgroundColor: 'red',
							float: 'right',
							width: '1.4rem',
							boxShadow: '0px 0px 0px 1px black',
							borderRadius: '2px',
						}}
						onClick={closeModal}
					>
						X
					</button> */}
					<div
						style={{
							// backgroundColor: 'red',
							width: '90%',
							height: '80%',
							margin: 'auto',
							display: 'flex',
							flexDirection: 'column',
							background: 'rgba(255, 224, 110,0.5)',
						}}
					>
						<form>
							<label
								style={{
									display: 'block',
									marginLeft: '.9rem',
									paddingTop: '.9rem',
								}}
								htmlFor='name'
							>
								User Name:
							</label>
							<input
								id='name'
								style={{
									width: '90%',
									marginLeft: '.9rem',
								}}
							/>

							<label
								style={{ display: 'block', marginLeft: '.9rem' }}
								htmlFor='password'
							>
								Password:
							</label>
							<input
								id='password'
								style={{ width: '90%', marginLeft: '.9rem' }}
							/>

							<label
								style={{ display: 'block', marginLeft: '.9rem' }}
								htmlFor='email'
							>
								Email:
							</label>
							<input
								type='email'
								id='email'
								style={{ width: '90%', marginLeft: '.9rem' }}
							/>
							<div style={{ display: 'flex', height: '40%' }}>
								<button
									style={{
										backgroundColor: 'white',
										padding: '0.5rem',
										margin: 'auto',
									}}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</Modal>
				<div className='dashboard-container'>
					<Chart
						className='chart'
						type='line'
						data={tempData}
						//  options={basicOptions}
					/>

					<Chart
						className='chart'
						type='line'
						data={humData}
						//  options={basicOptions}
					/>
				</div>
			</div>
		</div>
	);
};
