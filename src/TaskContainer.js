import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';
import { appDB } from './database';

const TaskContainer = () => {

	const [tasks, setTasks] = useState([]);

	useEffect(() => {
		appDB.getAllTasks().then((tasks) => setTasks(tasks));
	}, [tasks])

  const addTask = (task) => {
		const taskToAdd = { 
			title: task.title,
			completed: false, 
			dateTime: null 
		};
		appDB.addTask(taskToAdd);
  };

  const removeTask = (id) => {
		appDB.deleteTask(id);
  };

  const toggleCompleted = (id, completed) => {
		appDB.updateTask(id, { completed: !completed });
  };

  const setDateTime = (id, dateTime) => {
		appDB.updateTask(id, { dateTime });
	};

	function filterTasksByCompleted(tasks, isCompleted) {
		return tasks.filter(task => task.completed === isCompleted)
		.map(task => 
				<Task
					key={task.id}
					task={task}
					removeTask={removeTask}
					setDateTime={setDateTime}
					toggleCompleted={toggleCompleted}
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


