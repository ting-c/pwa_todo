import React, { useState } from 'react';

const Task = ({ task, removeTask, toggleCompleted }) => {

  const { title, id, completed } = task;
  const [taskTitle, setTitle] = useState(title);
  return (
    <div className='row input-group mb-3 animate__animated animate__bounceIn'>
      <div className="input-group-prepend">
        <div className="input-group-text">
          { completed ? 
          <input type="checkbox" aria-label="Checkbox" onChange={() => toggleCompleted(id)} checked /> 
          : 
          <input type="checkbox" aria-label="Checkbox" onChange={() => toggleCompleted(id)} />
          }
        </div>
      </div>
      <input type="text" className="form-control" aria-label="Task title" onChange={(e) => setTitle(e.target.value)} value={taskTitle} />
      <button className='btn btn-warning' onClick={() => removeTask(id)}>x</button>
    </div>
  )
}

export default Task;
