import React, { Component, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';
import Webcam from 'react-webcam';
import { Link } from 'react-router-dom'
import { userService } from '../../services/user.service';

import './dashboard.css'
let num = 0;

export const Dashboard = (props) => {
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
				label: 'Temperature',
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

	const WebcamComponent = () => <Webcam />;

	return (
		<div>
			<div className="container">
				<nav class="navMenu">
					<Link className=' button' to='/dashboard'>Refresh Page</Link>
					<Link className=' button' to='/about'>Edit Profile</Link>
					<button className='button' onClick={() => {
						userService.logout();
						console.log('Logout')
					}}>Sign out</button>
					<div class="dot"></div>
				</nav>
				<div className="cam-box">
					{!clicked && <button className='cam-button' onClick={() => setClicked(!clicked)}> Want to watch a live broadcast on our hive?
						<h2>Click Here</h2> </button>}
					{clicked && <button className='cam-button' onClick={() => setClicked(!clicked)}> Turn Off Camera </button>}
					{clicked && <Webcam />}
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
