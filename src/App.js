import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TaskContainer from './TaskContainer';
import EditTask from './EditTask';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import { appDB } from './database';
import {
	isNotificationAllowed,
	displayNotification,
	createTimer,
} from "./utils";

const App = () => {

	const [tasks, setTasks] = useState([]);
	const [isFetchTasksFromDb, setIsFetchTasksFromDb] = useState(true);
	const [isShowSidebar, setIsShowSidebar] = useState(false);
	const uniqueCategories = useRef([]);

	useEffect(() => {
		if (isFetchTasksFromDb) {
			appDB.getAllTasks().then(async (tasks) => {
				setTasks(tasks);
				uniqueCategories.current = getUniqueCategories(tasks);
				if (tasks.length) { await setNotificationTimers(tasks) };
				setIsFetchTasksFromDb(false);
			});
		}
	}, [isFetchTasksFromDb]);

	function getUniqueCategories(tasks) {
		const categories = tasks.filter(task => !!task.category)
		.map(task => task.category);
		console.log(categories)
		return [...new Set(categories)];
	};

	async function setNotificationTimers(tasks) {
		await tasks.forEach((task) => {
			const { dateTime, title, id, notification } = task;
			if (!dateTime) return
			if (notification) {	clearTimeout(notification) };
			const timer = createTimer(dateTime);
			if (isNotificationAllowed && timer.isFutureDateTime) {
				const notification = setTimeout(
					() => displayNotification(title),
					timer.duration
				);
				appDB.updateTask(id, { notification });
			}
		});
	};

  return (
		<React.Fragment>
			<Navbar
				setIsShowSidebar={setIsShowSidebar}
				isShowSidebar={isShowSidebar}
			/>
			<Router>
				{isShowSidebar ? (
					<Sidebar
						uniqueCategories={uniqueCategories.current}
						setIsShowSidebar={setIsShowSidebar}
					/>
				) : null}
				<Switch>
					<Route exact path="/">
						<TaskContainer
							appDB={appDB}
							tasks={tasks}
							setIsFetchTasksFromDb={setIsFetchTasksFromDb}
						/>
					</Route>
					<Route exact path="/edit/:id">
						<EditTask
							appDB={appDB}
							setNotificationTimers={setNotificationTimers}
							setIsFetchTasksFromDb={setIsFetchTasksFromDb}
							isFetchTasksFromDb={isFetchTasksFromDb}
						/>
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;