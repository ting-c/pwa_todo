import { createDatabase } from '../database';
import "@testing-library/jest-dom/extend-expect";
import Dexie from 'dexie';
const indexedDB = require("fake-indexeddb");
const IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

const db = new Dexie("MyDatabase", {
	indexedDB: indexedDB,
	IDBKeyRange: IDBKeyRange,
});

db.version(1).stores({
	tasks: "++id"
});

const appDB = createDatabase(db);

describe('indexedDB', () => {
  
  const mockTask = {
    title: 'Title 1',
    id: 1,
    completed: false,
    dateTime: new Date()
  };
  
  test('get task by id successfully after adding a mock task', async () => {
    await appDB.addTask(mockTask);
    const response = await appDB.getTask(1);
    expect(response.id).toEqual(mockTask.id);    
  });
  
  test('update task without changing other fields', async () => {
    const fieldsToUpdate = {
      title: 'Testing',
      completed: true
    }

    const expectedResult = {
      title: 'Testing',
      id: 1,
      completed: true
    };

    await appDB.updateTask(1, fieldsToUpdate);
    const response = await appDB.getTask(1);
    expect(response.title).toEqual(expectedResult.title);    
    expect(response.completed).toEqual(expectedResult.completed);    
    expect(response.date).toEqual(mockTask.date);    
  });

  test('delete task successfully', async () => {
    await appDB.deleteTask(1);
    const response = await appDB.getTask(1);
    expect(response).toBeUndefined();   
  });

  // DB is now empty  
  test('returns an array of all tasks', async () => {
    const mockTasks = [
			{
				title: "Title 1",
				id: 1,
				completed: false,
				dateTime: new Date()
			},
			{
				title: "Title 2",
				id: 2,
				completed: false,
				dateTime: new Date()
			},
    ];
    
    mockTasks.map((task) => appDB.addTask(task));
    const response = await appDB.getAllTasks();
    expect(response).toEqual(mockTasks);
  });

});