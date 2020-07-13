import React, { useState } from 'react';
import Task from './Task';
import AddTask from './AddTask';

const TaskContainer = () => {

  const [tasks, setTasks] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const addTask = (task) => {
    setTasks([
      ...tasks, 
      { title: task.title, idx: currentIdx }
    ]);
    setCurrentIdx(currentIdx + 1);
  };

  const removeTask = (idx) => {
    const currentTasks = tasks.filter( task => task.idx !== idx );
    setTasks(currentTasks);
  };

  return (
    <div className='row p-3'>
      <div className='col'>
        { 
          tasks.map( (task) => 
          <Task key={task.title} task={task} removeTask={removeTask} />
          ) 
        }
        <AddTask addTask={addTask} />
      </div>
    </div>
  )
}

export default TaskContainer;


