import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import DateTimePicker from "react-datetime-picker";
import DateTimeIcon from './img/datetime-icon.png';
import LoadingSpinner from "./LoadingSpinner";

const EditTask = ({ appDB, setNotificationTimers }) => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [isSyncingTaskFromDb, setSyncingTaskFromDb] = useState(true);
	const [isShowDatetime, setIsShowDateTime] = useState(false);
	
	if (isSyncingTaskFromDb) {
		appDB.getTask(parseInt(id)).then((taskFromDb) => {
			setTask(taskFromDb);
			setSyncingTaskFromDb(false);
		});
	};

	async function removeTask(id) {
		await appDB.deleteTask(id);
	};

	async function setDateTime(id, dateTime) {
		await appDB.updateTask(id, { dateTime });
		setNotificationTimers(id);
		setSyncingTaskFromDb(true);
	};

	async function changeTitle (id, title) {
		await appDB.updateTask(id, { title });
		setSyncingTaskFromDb(true);
	};

	return task ? (
		<div className="container p-0 animate__animated animate__fadeIn">
			<form>
				<div className="form-group shadow-sm p-2 rounded">
					<textarea
						type="text"
						className="form-control"
						id="task-title"
						value={task.title}
						onChange={(e) => changeTitle(e.target.value)}
						rows="6"
						style={{ resize: "none", border: "none" }}
					/>
					{ 
						task.dateTime ? (
						<div className="my-2" style={{width: '100%'}}>
							<span className="mr-3">{task.dateTime.toString().substr(0, 16)}</span>
							<span>{task.dateTime.toString().substr(16, 5)}</span>
						</div> ) : ( null )
					}
					<Link to='/'>
						<button
							type="button"
							className="btn btn-light"
							onClick={() => removeTask(task.id)}
						>
							Delete Task
						</button>
					</Link>
					<button
						type="button"
						className="btn btn-light"
						onClick={() => setIsShowDateTime(!isShowDatetime)}
					>
						<img
							src={DateTimeIcon}
							alt="datetime icon"
							style={{ height: "1rem" }}
						/>
					</button>
					{isShowDatetime ? (
						<div className="m-1">
							<DateTimePicker
								input={false}
								onChange={(dateTime) => setDateTime(task.id, dateTime, task.title)}
								value={task.dateTime}
							/>
						</div>
					) : null}
				</div>
			</form>
		</div>
	) : (
		<LoadingSpinner />
	);
};

export default EditTask;
