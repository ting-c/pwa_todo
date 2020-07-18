import React, { useState } from 'react';
import DateTimePicker from 'react-datetime-picker';
import dateTimeIcon from './img/datetime-icon.png';

const Task = ({ task, removeTask, toggleCompleted, setDateTime }) => {

  const { title, id, completed, dateTime } = task;

  const [taskTitle, setTitle] = useState(title);

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
				<div className="input-group-append">
					<a
						className="btn btn-success"
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
			<div className="row mb-3 collapse" id={`collapse${id}`}>
				<DateTimePicker
					onChange={setDateTime}
					value={dateTime}
					className={["shadow-sm"]}
				/>
			</div>
		</React.Fragment>
	);
}

export default Task;
