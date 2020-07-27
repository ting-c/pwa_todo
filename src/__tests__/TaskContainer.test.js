import React from 'react';
import { render, fireEvent, act } from '@testing-library/react';
import TaskContainer from '../TaskContainer';
import { createDatabase } from "../database";
import "@testing-library/jest-dom/extend-expect";
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

  let container;
  beforeEach(() => {
    container = render(<TaskContainer appDB={appDB} />);
  });

  test('render add task', async () => {
    expect(container.getByTestId('add-task-input')).toBeDefined();
  });

  test('update the input field in add task correctly', () => {
    let input;
    act(() => {
      input = container.getByTestId('add-task-input');
      fireEvent.change(input, { target: { value: 'Title 1' } });
    })
    expect(input).toHaveValue('Title 1')
  })
});