import React, { Component, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom';
import { userService } from '../../services/user.service';
import { GiTreeBeehive } from 'react-icons/gi';
import '../dashboard/dashboard.css';

let num = 0;

export const Dashboard = (props) => {
	const [ScreenshootClicked, setScreenshootClicked] = useState(false);

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

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios.get(`http://127.0.0.1:8000/get-data/`);

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
		}, 3000);

		console.log(dates);
		console.log(temperatures);
		return () => clearInterval(interval);
	});

	const refresh = () => {
		window.location.reload(true);
	};

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
						<Link className='button' to='/about'>
							Edit Profile
						</Link>
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
