import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import TaskContainer from '../TaskContainer';
import { createDatabase } from "../database";
import "@testing-library/jest-dom/extend-expect";
import { MemoryRouter } from 'react-router-dom';
import Dexie from "dexie";
const indexedDB = require("fake-indexeddb");
const IDBKeyRange = require("fake-indexeddb/lib/FDBKeyRange");

const db = new Dexie("MyDatabase", {
	indexedDB: indexedDB,
	IDBKeyRange: IDBKeyRange,
});

db.version(1).stores({
	tasks: "++id",
});

const appDB = createDatabase(db);

describe('TaskContainer component', () => {

  const tasks =[
    {
      id: 1,
      title: 'Title 1',
      isCompleted: false,
      dateTime: null,
      notification: null,
      category: null
    },
    {
      id: 2,
      title: 'Title 2',
      isCompleted: true,
      dateTime: null,
      notification: null,
      category: null
    }
  ];

  let categoryFilter = null;
  const setIsFetchTasksFromDb = jest.fn();

  let props = { appDB, tasks, setIsFetchTasksFromDb, categoryFilter };

  test("have text content of 'All Tasks' when categoryFilter is null", () => {
    render(
      <MemoryRouter>
        <TaskContainer {...props} />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('category-filter').textContent).toEqual('All Tasks');
  })

  test("have the correct text content when categoryFilter is NOT null", () => {
    categoryFilter = 'Exercise';
    props = {...props, categoryFilter}
    render(
      <MemoryRouter>
        <TaskContainer {...props} />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('category-filter').textContent).toEqual('Exercise');
  })

  test('update the input field in add task correctly', () => {
    let input;
    render(
      <MemoryRouter>
        <TaskContainer {...props} />
      </MemoryRouter>
    );
    act(() => {
      input = screen.getByTestId('add-task-input');
      fireEvent.change(input, { target: { value: 'Title 3' } });
    })
    expect(input).toHaveValue('Title 3')
  })

});