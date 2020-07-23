import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { appDB } from './database';

const TaskContainer = () => {
	
	const [tasks, setTasks] = useState([]);
	const [isSyncingTasksFromDb, setSyncingTasksFromDb] = useState(true)

	if (isSyncingTasksFromDb) {
		appDB.getAllTasks().then(tasksFromDb => {
			setTasks(tasksFromDb);
			setSyncingTasksFromDb(false);
		});
	};

  const addTask = async (task) => {
		const taskToAdd = { 
			title: task.title,
			isCompleted: false, 
			dateTime: null 
		};
		await appDB.addTask(taskToAdd);
		setSyncingTasksFromDb(true)
  };

  const removeTask = async (id) => {
		await appDB.deleteTask(id);
		setSyncingTasksFromDb(true);
  };

  const toggleIsCompleted = async (id, isCompleted) => {
		await appDB.updateTask(id, { isCompleted: !isCompleted });
		setSyncingTasksFromDb(true);
  };

  const setDateTime = async (id, dateTime) => {
		await appDB.updateTask(id, { dateTime });
		setSyncingTasksFromDb(true);
	};

	function filterTasksByCompleted(tasks, isCompleted) {
		return tasks.filter(task => task.isCompleted === isCompleted)
		.map(task => 
				<Task
					key={task.id}
					task={task}
					removeTask={removeTask}
					setDateTime={setDateTime}
					toggleIsCompleted={toggleIsCompleted}
				/>
			);
	}

  return (
		<div className="row p-3">
			<div className="col">
				<AddTask addTask={addTask} />
				<div className="row shadow-sm p-1 rounded">
					<div className="col" data-testid="tasks">
						{filterTasksByCompleted(tasks, false)}
					</div>
				</div>
				<div className="row bg-light shadow-sm p-1 rounded">
					<div className="col" data-testid="completed-tasks">
						<h6 className="row font-weight-bold">Completed</h6>
						{filterTasksByCompleted(tasks, true)}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TaskContainer;


