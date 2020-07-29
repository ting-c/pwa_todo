import React from 'react';
import { Link } from 'react-router-dom';

const Task = ({ task, toggleIsCompleted }) => {

	const { title, id, isCompleted } = task;

  return (
		<div
			className="row input-group animate__animated animate__bounceIn mb-2 p-2 shadow-sm rounded"
			data-testid={isCompleted ? "completed-tasks" : "tasks"}
		>
			<div className="col-2">
				<input
					type="checkbox"
					aria-label="Checkbox"
					onChange={() => toggleIsCompleted(id, isCompleted)}
					checked={isCompleted ? true : null }
					data-testid="checkbox"
				/>
			</div>
			<Link
				className="col-10"
				to={`/edit/${id}`}
				label="Task title"
				data-testid="task-title"
				style={{
					color: isCompleted ? "grey" : "black",
					wordBreak: "break-word",
					textDecoration: isCompleted ? "line-through" : "none",
					width: "100%",
				}}
			>
				{title}
			</Link>
		</div>
	);
}

export default Task;
