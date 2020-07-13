import React, { useState } from 'react';

const Task = ({ task, removeTask }) => {

  const { title, idx } = task;
  const [taskTitle, setTitle] = useState(title);

  return (
    <div className='row mb-3 input-group form-check'>
      <div className="input-group-prepend">
        <div className="input-group-text row">
          <div className='col'>
            <input type="checkbox" aria-label="Checkbox" />
          </div>
        </div>
      </div>
      <input type="text" className="form-control" aria-label="Task title" onChange={(e) => setTitle(e.target.value)} value={taskTitle} />
      <button className='btn btn-warning' onClick={() => removeTask(idx)}>x</button>
    </div>
  )
}

export default Task;
