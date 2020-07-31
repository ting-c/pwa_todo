import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { appDB } from "./database";
import { capitalizeString } from './utils';
import DateTimePicker from "react-datetime-picker";
import DateTimeIcon from './img/datetime-icon.png';
import SaveIcon from './img/save-icon.png';
import LoadingSpinner from "./LoadingSpinner";
import TrashIcon from './TrashIcon';

const EditTask = ({
	isFetchTasksFromDb,
	setIsFetchTasksFromDb,
	uniqueCategories,
	setIsShowAlert,
	setAlertProps,
}) => {
	const { id } = useParams();
	const [task, setTask] = useState(null);
	const [title, setTitle] = useState("");
	const [isShowDatetime, setIsShowDateTime] = useState(false);
	const [category, setCategory] = useState("");


	useEffect(() => {
		appDB.getTask(parseInt(id)).then((task) => {
			setTask(task);
			setTitle(task.title);
		});
	}, [isFetchTasksFromDb, id]);

	async function removeTask(id) {
		await appDB.deleteTask(id);
		setIsFetchTasksFromDb(true);
	}

	async function setDateTime(id, dateTime) {
		await appDB.updateTask(id, { dateTime });
		setIsFetchTasksFromDb(true);
	}

	async function changeTitle(id, title) {
		if (!title) return;
		await appDB.updateTask(id, { title });
		setIsFetchTasksFromDb(true);
		setAlertProps({message: 'Updated title successfully', type: 'success'})
		setIsShowAlert(true);
	}

	async function updateCategory(id, category = null, e = null) {
		if (e) {
			e.preventDefault();
		}
		await appDB.updateTask(id, { category });
		setIsFetchTasksFromDb(true);
	}

	async function handleSubmit(e) {
		e.preventDefault();
		await changeTitle(task.id, capitalizeString(title));
		setIsFetchTasksFromDb(true);
	}

	return task ? (
		<div className="container p-0 animate__animated animate__fadeIn">
			<form
				className="form-group shadow-sm p-2 rounded"
				onSubmit={(e) => handleSubmit(e)}
			>
				<textarea
					type="text"
					className="form-control mb-1"
					id="task-title"
					value={title}
					onChange={(e) => setTitle(capitalizeString(e.target.value))}
					rows="6"
					style={{ resize: "none", border: "none" }}
				/>
				<button className="btn btn-light" type="submit">
					<img src={SaveIcon} alt="save icon" style={{ height: "1rem" }} />
				</button>
				<Link to="/">
					<button
						type="button"
						className="btn btn-light float-right"
						onClick={() => removeTask(task.id)}
					>
						<TrashIcon />
					</button>
				</Link>
			</form>
			<div className="shadow-sm p-2 rounded">
				{task.dateTime ? (
					<div className="my-2 text-muted" style={{ width: "100%" }}>
						<div>{task.dateTime.toString().substr(0, 16)}</div>
						<div>{task.dateTime.toString().substr(16, 5)}</div>
					</div>
				) : null}
				<button
					type="button"
					className="btn btn-light rounded"
					onClick={() => setIsShowDateTime(!isShowDatetime)}
				>
					<img
						src={DateTimeIcon}
						alt="datetime icon"
						style={{ height: "1rem" }}
					/>
				</button>
				{isShowDatetime ? (
					<div className="m-1 rounded">
						<DateTimePicker
							input={false}
							onChange={(dateTime) =>
								setDateTime(task.id, dateTime, task.title)
							}
							value={task.dateTime}
						/>
					</div>
				) : null}
			</div>
			<div className="shadow-sm rounded p-3">
				{task.category ? (
					<div className="row px-3 align-items-center">
						<div className="col-10">{task.category}</div>
						<button
							className="col-2 btn"
							type="button"
							onClick={() => updateCategory(task.id)}
						>
							x
						</button>
					</div>
				) : (
					<React.Fragment>
						<form
							className="row form-group pt-3 px-3 d-flex justify-content-center"
							onSubmit={(e) => updateCategory(task.id, category, e)}
						>
							{uniqueCategories ? (
								<div
									className="input-group"
									onChange={(e) =>
										setCategory(capitalizeString(e.target.value))
									}
								>
									<div
										className="input-group"
										onChange={(e) => {
											updateCategory(task.id, e.target.value);
										}}
									>
										<select
											className="custom-select small font-italic"
											id="category"
											aria-label="category select"
										>
											<option value={null}>Choose an existing category</option>
											{uniqueCategories.map((category, idx) => (
												<option value={category} key={idx}>
													{category}
												</option>
											))}
										</select>
									</div>
								</div>
							) : null}
							<div className="input-group mt-3">
								<input
									className="form-control"
									type="text"
									placeholder="Add a new category"
									value={category}
									onChange={(e) =>
										setCategory(capitalizeString(e.target.value))
									}
									required
								/>
								<div className="input-group-append">
									<button
										className="btn btn-outline-secondary"
										type="submit"
										value={category}
									>
										+
									</button>
								</div>
							</div>
						</form>
					</React.Fragment>
				)}
			</div>
		</div>
	) : (
		<LoadingSpinner />
	);
};

export default EditTask;
