// react essentials
import React from 'react'
import './App.css'
import { Switch, Route, Link } from 'react-router-dom'
// components
import UserScheduler from './components/UserScheduler'
import VendorScheduler from './components/VendorScheduler'
import Login from './components/Login'
import slots from './slots'
// calendar and time picker
import Calendar from 'rc-calendar'
import moment from 'moment'
import TimePickerPanel from 'rc-time-picker/lib/Panel'
import enUS from 'rc-calendar/lib/locale/en_US'
// css
import 'rc-calendar/assets/index.css'
import 'rc-time-picker/assets/index.css'

// temp timeslot data
import timeslotdata from './timeslot-data.json'
import Timeslots from './components/Timeslots'

const now = moment()
const format = 'YYYY-MM-DD hh:mm a'
function getFormat(time) {
	return time ? format : 'YYYY-MM-DD'
}

const timePickerElement = <TimePickerPanel format={format} defaultValue={moment('00:00', 'HH:mm a')} showSecond={false} use12Hours />

// functions handling disabling dates and times
function disabledTime(date) {
	if (date && date.date() === 15) {
		return {
			disabledHours() {
				return [3, 4]
			},
		}
	}
	return {
		disabledHours() {
			return [1, 2]
		},
	}
}

function disabledDate(current) {
	if (!current) {
		// allow empty select
		return false
	}
	const date = moment()
	date.hour(0)
	date.minute(0)
	date.second(0)
	return current.valueOf() < date.valueOf() // can not select days before today
}

// value retrieval
function onStandaloneSelect(value) {
	console.log('onStandaloneSelect')
	console.log(value && value.format(format))
}

function onStandaloneChange(value) {
	console.log('onStandaloneChange')
	console.log(value && value.format(format))
}

function App() {
	return (
		<div className="container">
			<Link to="/">Home</Link>
			<Link to="/about">About</Link>
			<Link to="/calendar">Calendar</Link>
			<Link to="/time">Timeslot</Link>
			<div>
				<Switch>
					{' '}
					{/*more specific paths first*/}
					<Route path="/calendar">
						<Calendar
							id="vendorCalendar"
							showWeekNumber={false}
							locale={enUS}
							defaultValue={now}
							disabledTime={disabledTime}
							showToday
							format={getFormat(true)}
							showOk={false}
							timePicker={timePickerElement}
							onChange={onStandaloneChange}
							disabledDate={disabledDate}
							onSelect={onStandaloneSelect}
							renderFooter={(mode) => <span>{mode} extra footer</span>}
						/>

						<Calendar
							id="userCalendar"
							showWeekNumber={false}
							locale={enUS}
							defaultValue={now}
							disabledTime={disabledTime}
							showToday
							format={getFormat(true)}
							showOk={false}
							timePicker={timePickerElement}
							onChange={onStandaloneChange}
							disabledDate={disabledDate}
							onSelect={onStandaloneSelect}
							renderFooter={(mode) => <span>{mode} extra footer</span>}
						/>
					</Route>
					<Route path="/time">
						<Timeslots timeslotdata={timeslotdata} />
					</Route>
					<Route path="/about">
						<VendorScheduler />
					</Route>
					<Route path="/">
						<Login />
					</Route>
				</Switch>
			</div>
		</div>
	)
}

export default App
