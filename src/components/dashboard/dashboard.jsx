import React, { Component, useEffect, useState, useRef } from 'react'
import { Chart } from 'primereact/chart'
import axios from 'axios'
import Webcam from 'react-webcam'
import { userService } from '../../services/user.service'
import { GiTreeBeehive } from 'react-icons/gi'
import '../dashboard/dashboard.css'
import Modal from 'react-modal'

let num = 0
let location = {
	lat: undefined,
	lon: undefined,
}

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
}
export const Dashboard = ({ auth }) => {
	const [showModal, setShowModal] = useState(false)
	const [showFAQModal, setShowFAQModal] = useState(false)
	const [name, setName] = useState(sessionStorage.getItem('name'))
	const [password, setPassword] = useState(sessionStorage.getItem('password'))
	const [email, setEmail] = useState(sessionStorage.getItem('email'))
	const [location, setLocation] = useState({ lat: undefined, lon: undefined })

	const webRef = useRef(null)
	let img

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
	})

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
	})

	const [dates, setDates] = useState([])
	const [temperatures, setTemperatures] = useState([])
	const [humidities, setHumidities] = useState([])
	const [clicked, setClicked] = useState(false)

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((position) => {
			const pos = {
				lat: position.coords.latitude,
				lon: position.coords.longitude,
			}

			setLocation(pos)
		})
	}, [])

	useEffect(() => {
		const interval = setInterval(async () => {
			const response = await axios.get(`http://127.0.0.1:8000/get-data/`)
			if (response.status === 200) {
				const resData = response.data

				setTemperatures([...temperatures, resData.temperature])

				setHumidities([...humidities, resData.humidity])

				setDates([...dates, resData.date])

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
				})

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
				})
				num += 1
			} else {
				alert('bad temperature or humidity, beehome can be in danger!')
			}
		}, 5000)
		return () => clearInterval(interval)
	})

	const refresh = () => {
		window.location.reload(true)
	}

	function afterOpenModal() {
		subtitle.style.color = '#fff'
	}
	console.log(localStorage.getItem('user'))
	let subtitle

	const submitChanges = () => {
		sessionStorage.setItem('name', name)
		sessionStorage.setItem('password', password)
		sessionStorage.setItem('email', email)
	}

	return (
		<div>
			<div className='container'>
				<div className='nav-container'>
					<div className='logo-container'>
						<GiTreeBeehive className='logo' />
						<h3>BeeZone</h3>
					</div>
					<nav className='navMenu'>
						<button className='button' onClick={() => setShowFAQModal(true)}>
							FAQ
						</button>
						<button className=' button refresh-button' onClick={refresh}>
							Refresh Page
						</button>
						<button className='button' onClick={() => setShowModal(true)}>
							Edit Profile
						</button>
						<button
							className='button'
							onClick={() => {
								userService.logout()
								console.log('Logout')
								window.location.href = '/'
							}}
						>
							Sign out
						</button>
						{/* <div className='dot'></div> */}
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
					{clicked && <Webcam className='webcam' audio={false} ref={webRef} />}
				</div>
				<Modal
					isOpen={showModal}
					onAfterOpen={afterOpenModal}
					onRequestClose={() => setShowModal(false)}
					style={customStyles}
					contentLabel='Example Modal'
					ariaHideApp={false}
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
						PERSONAL INFO
					</h2>
					<div
						style={{
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
								value={name || ''}
								onChange={(e) => {
									setName(e.target.value)
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
								value={password || ''}
								onChange={(e) => {
									setPassword(e.target.value)
								}}
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
								value={email || ''}
								onChange={(e) => {
									setEmail(e.target.value)
								}}
							/>
							<div style={{ display: 'flex', height: '40%' }}>
								<button
									style={{
										backgroundColor: 'white',
										padding: '0.5rem',
										margin: 'auto',
									}}
									onClick={submitChanges}
								>
									Submit
								</button>
							</div>
						</form>
					</div>
				</Modal>

				<Modal
					isOpen={showFAQModal}
					onAfterOpen={afterOpenModal}
					onRequestClose={() => setShowFAQModal(false)}
					style={customStyles}
					contentLabel='Example Modal'
					ariaHideApp={false}
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
						FAQ
					</h2>
					<h4 style={{ fontWeight: 700 }}>How does the Beehome work?</h4>
					<p>The Beehome has cameras inside of it, robotic arms, sensors and other systems, that allow it to execute what a Beekeeper would normally do. The robotic arms within Beehome treat pests, feed, prevent swarming from happening and more, similar to what a Beekeeper would have done. Beekeepers can also remote control the Beehome over the web so they have full flexibility with the upkeep of their colonies.</p>
					<h4 style={{ fontWeight: 700 }}>How do the hives within Beehome work?</h4>
					<p>The hives look similar to what exists today. The bees??? living quarters did not change much, except for the fact that now a robot extracts frames and not a human. The bees do not get to experience the robot because when a frame is extracted for inspection, the bees remain within their hive.</p>
					<h4 style={{ fontWeight: 700 }}>How many colonies are housed within a single Beehome device?</h4>
					<p>24 full-fledged colonies</p>	
				</Modal>


				<div className='dashboard-container'>
					<Chart className='chart' type='line' data={tempData} />
					<Chart className='chart' type='line' data={humData} />
				</div>
				<div className='location'>
					{location.lat != undefined && location.lon != undefined && (
						<>
							<h3>Your location is:</h3>
							<h6>
								lat: {location.lat} lon: {location.lon}
							</h6>
						</>
					)}
				</div>
			</div>
		</div>
	)
}
