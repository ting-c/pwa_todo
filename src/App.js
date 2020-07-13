import React from 'react';
import TaskContainer from './TaskContainer';

const App = () => {
  return (
    <div className='container'>
      <h1 className='row d-flex justify-content-center text-center m-3'>Todo App</h1>
      <TaskContainer />
    </div>
  )
};

export default App;