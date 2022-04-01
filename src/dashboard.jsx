import React, { Component, useEffect, useState } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'

let num = 0

export const Dashboard = (props) => {
	const [data, setData] = useState([])

	useEffect(() => {
		const interval = setInterval(async () => {
			console.log('This will be called every 2 seconds')
            const response = await axios.get(`http://127.0.0.1:8000/get-data/${num}`)

            num += 1
            console.log(response.data)
		}, 2000)

		return () => clearInterval(interval)
	}, [])

	return <h1>Dashboard & charts goes here!</h1>
}
