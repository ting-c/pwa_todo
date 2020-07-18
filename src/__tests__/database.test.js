import { addTask, getTask } from '../database';
import "@testing-library/jest-dom/extend-expect";
import Dexie from 'dexie';
const indexedDB = require("fake-indexeddb");
const IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

const db = new Dexie("MyDatabase", {
	indexedDB: indexedDB,
	IDBKeyRange: IDBKeyRange,
});

db.version(1).stores({
	tasks: "&id"
});

describe('indexedDB', () => {

  test('get task by id successfully after adding a mock task', async () => {
    const mockTask = {
      title: 'Title 1',
      id: 1,
      completed: false,
      dateTime: new Date()
    };

    await addTask(db, mockTask);
    const response = await getTask(db, 1);
    expect(response).toEqual(mockTask)    
  });

});