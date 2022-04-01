import React, { Component, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'

let num = 0

export const Dashboard = (props) => {
	const [data, setData] = useState({
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
	})

	const [dates, setDates] = useState([])
	const [temperatures, setTemperatures] = useState([])

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios.get(`http://127.0.0.1:8000/get-data/${num}`)

			const resData = response.data

			setTemperatures([...temperatures, resData.temperature])

			setDates([...dates, resData.date])

			setData({
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
			})
			num += 1
		}, 3000)

		console.log(dates)
		console.log(temperatures)
		return () => clearInterval(interval)
	})

	return (
		<div>
			<h1>Dashboard & charts goes here!</h1>
			<div className='card'>
				<Chart
					className="temp-chart"
					type='line'
					data={data}
					//  options={basicOptions}
				/>
			</div>
		</div>
	)
}
