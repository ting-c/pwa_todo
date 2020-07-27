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

	const changeTitle = async (id, title) => {
		await appDB.updateTask(id, { title });
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
					changeTitle={changeTitle}
				/>
			);
	}

  return (
		<div className='container'>
			<div className="row p-3">
				<div className="col">
					<AddTask addTask={addTask} />
					<div className="row rounded">
						<div className="col" data-testid="tasks">
							{filterTasksByCompleted(tasks, false)}
						</div>
					</div>
						<div data-testid="completed-tasks">
							{filterTasksByCompleted(tasks, true)}
						</div>
					
				</div>
			</div>
		</div>
	);
}

export default TaskContainer;


