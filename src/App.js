import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TaskContainer from './TaskContainer';
import EditTask from './EditTask';
import { appDB } from './database';
import {
	isNotificationAllowed,
	displayNotification,
	createTimer,
} from "./utils";

const App = () => {

	async function setNotificationTimers(task_id) {
		await appDB
			.getAllTasks()
			.then((tasks) => tasks.forEach(({ dateTime, title, notification }) => {
				if (notification) { clearTimeout(notification) };
				const timer = createTimer(dateTime);
				if (isNotificationAllowed && timer.isFutureDateTime) {
					const notification = setTimeout(() => displayNotification(title),	timer.duration);
					appDB.updateTask(task_id, { notification });
				};
		}))
	}

	useEffect(() => {
		const notificationTimers = setNotificationTimers();
		return () => {
			notificationTimers.forEach(notification => clearTimeout(notification))
		}
	})

  return (
		<Router>
			<Switch>
				<Route exact path='/'>
					<TaskContainer appDB={appDB} />
				</Route>
				<Route exact path='/edit/:id'>
					<EditTask appDB={appDB} setNotificationTimers={setNotificationTimers} />
				</Route>
			</Switch>
		</Router>
	);
}

export default App;