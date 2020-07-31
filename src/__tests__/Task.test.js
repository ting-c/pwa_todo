import React from 'react';
import { render, screen } from '@testing-library/react';
import Task from '../Task';
import { MemoryRouter } from "react-router-dom";

describe('Task', () => {
  
  test('checkbox is checked and has the correct style properties when the task is completed', () => {
    const task = {
      id: 1,
      title: 'Title 1',
      isCompleted: true,
      dateTime: null,
      notification: null,
      category: null
    };
    const toggleIsCompleted = jest.fn();
    const props = { task, toggleIsCompleted };

    render(
      <MemoryRouter>
        <Task {...props} />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('checkbox-1').checked).toEqual(true);
    expect((screen.getByTestId('task-title-1')).style.textDecoration).toEqual('line-through');
    expect((screen.getByTestId('task-title-1')).style.color).toEqual('grey');
  });

  test('checkbox is NOT checked when the task is completed', () => {
    const task = {
      id: 2,
      title: 'Title 2',
      isCompleted: false,
      dateTime: null,
      notification: null,
      category: null
    };
    const toggleIsCompleted = jest.fn();
    const props = { task, toggleIsCompleted };

    render(
      <MemoryRouter>
        <Task {...props} />
      </MemoryRouter>
    );
    
    expect(screen.getByTestId('checkbox-2').checked).toEqual(false);
  });

})