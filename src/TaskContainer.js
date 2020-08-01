import React from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { capitalizeString } from './utils';

const TaskContainer = ({ appDB, tasks, setIsFetchTasksFromDb, categoryFilter }) => {
	const addTask = async (task, category = null) => {
		const taskToAdd = {
			title: task.title,
			isCompleted: false,
			dateTime: null,
			notification: null,
			category,
		};
		await appDB.addTask(taskToAdd);
		setIsFetchTasksFromDb(true);
	};

	const removeTask = async (id) => {
		await appDB.deleteTask(id);
		setIsFetchTasksFromDb(true);
	};

	const toggleIsCompleted = async (id, isCompleted) => {
		await appDB.updateTask(id, { isCompleted: !isCompleted });
		setIsFetchTasksFromDb(true);
	};

	const setDateTime = async (id, dateTime) => {
		await appDB.updateTask(id, { dateTime });
		setIsFetchTasksFromDb(true);
	};

	const changeTitle = async (id, title) => {
		await appDB.updateTask(id, { title: capitalizeString(title) });
		setIsFetchTasksFromDb(true);
	};

	function filterTasksByCompleted(tasks, isCompleted) {
		return tasks
			.filter((task) => task.isCompleted === isCompleted)
			.map((task) => (
				<Task
					key={task.id}
					task={task}
					removeTask={removeTask}
					setDateTime={setDateTime}
					toggleIsCompleted={toggleIsCompleted}
					changeTitle={changeTitle}
				/>
			));
	}

	return (
		<div className="container" style={{ zIndex: "1" }}>
			<div className="row p-3">
				<div className="col">
					<AddTask addTask={addTask} />
					<div className="row text-muted bg-light my-2 p-2 rounded" data-testid="category-filter">
						{categoryFilter || 'All Tasks'}
					</div>
					{filterTasksByCompleted(tasks, false)}
					{filterTasksByCompleted(tasks, true)}
				</div>
			</div>
		</div>
	);
};

export default TaskContainer;


