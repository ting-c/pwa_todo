import Dexie from 'dexie';

const db = new Dexie('db');

db.version(1).stores({
	tasks: "&id"
});

// add task
export async function addTask(db, task) {
	try {
		await db.tasks.add(task)
	} catch (err) {
		err => console.error(err)
	}
};

// get task
export async function getTask(db, task_id) {
	try {
		return await db.tasks.get({ id: task_id })
	} catch (err) {
		err => console.error(err)
	}
};
	
export default db;