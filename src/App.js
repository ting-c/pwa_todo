import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import TaskContainer from './TaskContainer';
import EditTask from './EditTask';
import Sidebar from './Sidebar';
import Navbar from './Navbar';
import Alert from "./Alert";
import { appDB } from './database';
import {
	displayNotification,
	createTimer,
} from "./utils";

const App = () => {

	const [tasks, setTasks] = useState([]);
	const [isFetchTasksFromDb, setIsFetchTasksFromDb] = useState(true);
	const [isShowSidebar, setIsShowSidebar] = useState(false);
	const [isShowAlert, setIsShowAlert] = useState(false);
	const [alertProps, setAlertProps] = useState(null);
	const [categoryFilter, setCategoryFilter] = useState(null);

	const uniqueCategories = useRef([]);
	
	useEffect(() => {
		appDB.getAllTasks().then(async (tasks) => {
			categoryFilter ? 
				setTasks(tasks.filter(task => task.category === categoryFilter))	:
				setTasks(tasks);
			uniqueCategories.current = getUniqueCategories(tasks);
			if (tasks.length) { await setNotificationTimers(tasks) };
			setIsFetchTasksFromDb(false);
		});
	}, [isFetchTasksFromDb, categoryFilter]);

	const isNotificationAllowed = Notification.requestPermission(function (result) {
		if (result === "granted") {
			return true;
		}
		alert("Please allow notications to enable reminder feature");
		return false;
	});

	function getUniqueCategories(tasks) {
		const categories = tasks.filter(task => !!task.category)
		.map(task => task.category);
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
			{isShowAlert ? (
				<Alert {...alertProps} setIsShowAlert={setIsShowAlert} />
			) : null}
			<Router>
				{isShowSidebar ? (
					<Sidebar
						uniqueCategories={uniqueCategories.current}
						setIsShowSidebar={setIsShowSidebar}
						setCategoryFilter={setCategoryFilter}
					/>
				) : null}
				<Switch>
					<Route exact path="/">
						<TaskContainer
							appDB={appDB}
							tasks={tasks}
							setIsFetchTasksFromDb={setIsFetchTasksFromDb}
							categoryFilter={categoryFilter}
						/>
					</Route>
					<Route exact path="/edit/:id">
						<EditTask
							appDB={appDB}
							setNotificationTimers={setNotificationTimers}
							setIsFetchTasksFromDb={setIsFetchTasksFromDb}
							isFetchTasksFromDb={isFetchTasksFromDb}
							uniqueCategories={uniqueCategories.current}
							setIsShowAlert={setIsShowAlert}
							setAlertProps={setAlertProps}
						/>
					</Route>
				</Switch>
			</Router>
		</React.Fragment>
	);
}

export default App;