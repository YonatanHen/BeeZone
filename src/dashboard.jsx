import React, { Component, useEffect, useState } from 'react';
import { Chart } from 'primereact/chart';
import axios from 'axios';

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

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios.get(`http://127.0.0.1:8000/get-data/${num}`);

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

	return (
		<div>
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
	);
};
