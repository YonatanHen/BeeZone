// React:
import React, { Component, useEffect, useState } from 'react';

// Apis:
import { Chart } from 'primereact/chart';
import axios from 'axios';

// Style:
import StyledComponent from 'styled-components';
import tw from 'twin.macro';

const DashboardContainer = StyledComponent.div`
	${tw`
		
		
		width[90%]
		height[100%]
		grid
		gap-2
	`}
`;

const ChartsContainer1 = tw.div`
	
	bg-green-300/20
	flex
	flex-col
	md:flex-row
	gap-2
	
	`;
const ChartsContainer2 = tw.div`
	bg-purple-300
	
	`;

const ChartPanel = StyledComponent.div`
	${tw`
		bg-blue-400/20
		md:w-1/2 
		w-full
		m-auto
	`}
`;

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
		<DashboardContainer>
			<ChartsContainer1>
				<ChartPanel>
					<Chart
						className='chart'
						type='line'
						data={tempData}

						//  options={basicOptions}
					/>
				</ChartPanel>
				<ChartPanel>
					{' '}
					<Chart
						className='chart'
						type='line'
						data={tempData}
						//  options={basicOptions}
					/>
				</ChartPanel>
			</ChartsContainer1>
			<ChartsContainer2>Continue here...</ChartsContainer2>
		</DashboardContainer>
	);
};
