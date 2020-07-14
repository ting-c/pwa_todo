import React, { useState } from 'react';
import ErrMessage from './ErrMessage';

const AddTask = ({ addTask }) => {

  const initialState = { title: ''};
  const [task, setTask] = useState(initialState);
  const [errMessage, setErrMessage] = useState('');

  const handleChange = (e) => {
    setTask({ 
      title: e.target.value
    });
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if(!task.title) { 
      setErrMessage('Missing title');
      return 
    };
    addTask(task);
    setTask(initialState);
  }

  return (
    <React.Fragment>
    <form onSubmit={(e) => handleAddTask(e)}>
      <div className='row mb-3'>
        <input className='col-10 form-control' type='text' value={task.title} onChange={(e) => handleChange(e)}  placeholder='Add Task' data-testid='add-task-input'/>
        <button className='btn col-2' type='submit' style={{fontSize: '1rem'}}>
          +
        </button>
      </div>
    </form> 
    { 
      errMessage ? (
        <ErrMessage message='Missing title'/>
      ) : null
    }
    </React.Fragment>
  )
}

export default AddTask
