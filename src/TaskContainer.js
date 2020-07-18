import React, { useState, useEffect } from 'react';
import Task from './Task';
import AddTask from './AddTask';

const TaskContainer = () => {

  const [tasks, setTasks] = useState([]);
  const [currentTaskId, setCurrentTaskId] = useState(0);

  const addTask = (task) => {
    setTasks([
      ...tasks, 
      { title: task.title, id: currentTaskId, completed: false, dateTime: null }
    ]);
    setCurrentTaskId(currentTaskId + 1);
  };

  const removeTask = (id) => {
    const currentTasks = tasks.filter( task => task.id !== id );
    setTasks(currentTasks);
  };

  const toggleCompleted = (id) => {
    const taskToToggle = tasks.find(task => task.id === id);
    taskToToggle.completed = !taskToToggle.completed;
    const updatedTasks = tasks.map(task => task.id === id ? {...taskToToggle} : task);
    setTasks(updatedTasks);
  };

  const setDateTime = (id, dateTime) => {
    const taskToSetDateTime = tasks.find((task) => task.id === id);
    taskToSetDateTime.dateTime = dateTime;
    const updatedTasks = tasks.map(task => task.id === id ? {...taskToSetDateTime} : task);
    setTasks(updatedTasks);
  };

  return (
		<div className="row p-3">
			<div className="col">
				<AddTask addTask={addTask} />
				<div className="row shadow-sm p-1 rounded">
					<div className="col" data-testid="tasks">
						{tasks
							.filter((task) => !task.completed)
							.map((task) => (
								<Task
									key={task.id}
									task={task}
									removeTask={removeTask}
									setDateTime={setDateTime}
									toggleCompleted={toggleCompleted}
								/>
							))}
					</div>
				</div>
				<div className="row bg-light shadow-sm p-1 rounded">
					<div className="col" data-testid="completed-tasks">
						<h6 className="row font-weight-bold">Completed</h6>
						{tasks
							.filter((task) => !!task.completed)
							.map((task) => (
								<Task
									key={task.id}
									task={task}
									removeTask={removeTask}
									setDateTime={setDateTime}
									toggleCompleted={toggleCompleted}
								/>
							))}
					</div>
				</div>
			</div>
		</div>
	);
}

export default TaskContainer;


