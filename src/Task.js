import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import dateTimeIcon from './img/datetime-icon.png';

const Task = ({ task, removeTask, toggleCompleted }) => {

  const { title, id, completed } = task;

  const [taskTitle, setTitle] = useState(title);
  const [dateTime, setDateTime] = useState(new Date());

  return (
    <React.Fragment>
		<div className="row input-group animate__animated animate__bounceIn">
			<div className="input-group-prepend">
				<div className="input-group-text">
					{completed ? (
						<input
							type="checkbox"
							aria-label="Checkbox"
							onChange={() => toggleCompleted(id)}
							checked
						/>
					) : (
						<input
							type="checkbox"
							aria-label="Checkbox"
							onChange={() => toggleCompleted(id)}
						/>
					)}
				</div>
			</div>
			<input
				type="text"
				className="form-control"
				aria-label="Task title"
				onChange={(e) => setTitle(e.target.value)}
				value={taskTitle}
			/>
			<div class="input-group-append">
        <a
          class="btn btn-success"
          data-toggle="collapse"
          href={`#collapse${id}`}
          role="button"
          aria-expanded="false"
          aria-controls={`collapse${id}`}
        >
          <img
            src={dateTimeIcon}
            alt="datetime-icon"
            style={{ height: "1rem" }}
          />
        </a>        
        <button className="btn btn-warning" onClick={() => removeTask(id)}>
          x
        </button>
			</div>

		</div>
    <div class="row mb-3 collapse" id={`collapse${id}`}>
      <DateTimePicker onChange={setDateTime} value={dateTime} className={["shadow-sm", ""]} />
    </div>
    </React.Fragment>
	);
}

export default Task;
