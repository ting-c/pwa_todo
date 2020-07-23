import React, { useState, useEffect, useRef } from 'react';
import DateTimePicker from 'react-datetime-picker';
import dateTimeIcon from './img/datetime-icon.png';
import { 
	isNotificationAllowed,
	displayNotification,
	createTimer
} from './utils';

const Task = ({ task, removeTask, toggleIsCompleted, setDateTime }) => {

	const { title, id, isCompleted, dateTime } = task;
	
	const [taskTitle, setTitle] = useState(title);
	const notificationTimer = useRef(null);

	useEffect(() => {
		const timer = createTimer(dateTime);
		if (isNotificationAllowed && timer.isFutureDateTime && !isCompleted) {
			if (notificationTimer.current) { clearTimeout(notificationTimer.current) };
			notificationTimer.current = setTimeout(() => displayNotification(title),	timer.duration);
		}
	});	

  return (
		<React.Fragment>
			<div className="row input-group animate__animated animate__bounceIn">
				<div className="input-group-prepend">
					<div className="input-group-text">
						{isCompleted ? (
							<input
								type="checkbox"
								aria-label="Checkbox"
								onChange={() => toggleIsCompleted(id, isCompleted)}
								checked
							/>
						) : (
							<input
								type="checkbox"
								aria-label="Checkbox"
								onChange={() => toggleIsCompleted(id, isCompleted)}
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
					data-testid="datetime-input"
					onChange={(value) => setDateTime(id, value)}
					value={dateTime}
					className={["shadow-sm"]}
					disableClock={true}
				/>
			</div>
		</React.Fragment>
	);
}

export default Task;
