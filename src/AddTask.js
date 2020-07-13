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
    <div className='row'>
      <form onSubmit={(e) => handleAddTask(e)}>
        <button className='btn btn-secondary mx-3' type='submit'>
          +
        </button>
        <input type='text' value={task.title} onChange={(e) => handleChange(e)}  placeholder='Add Task' />
      </form>
      { 
        errMessage ? (
          <ErrMessage message='Missing title'/>
        ) : null
      }
    </div>
  )
}

export default AddTask
