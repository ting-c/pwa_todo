import Dexie from 'dexie';
const db = new Dexie('db');
db.version(1).stores({
	tasks: "++id, title"
});

export const appDB = createDatabase(db);

export function createDatabase(db) {
	return {
		async addTask(task) {
			try {
				await db.tasks.add(task);
			} catch (err) {
				console.error(err);
			}
		},

		async getTask(task_id) {
			try {
				return await db.tasks.get({ id: task_id });
			} catch (err) {
				console.error(err);
			}
		},

		async updateTask(task_id, fieldToUpdate) {
			try {
				return await db.tasks.update(task_id, fieldToUpdate);
			} catch (err) {
				console.error(err);
			}
		},

		async deleteTask(task_id) {
			try {
				return await db.tasks.delete(task_id);
			} catch (err) {
				console.error(err);
			}
		},

		async getAllTasks() {
			try {
				return await db.tasks.toArray();
			} catch (err) {
				console.error(err);
			}
		}
	}
}