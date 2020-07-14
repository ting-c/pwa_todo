import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskContainer from '../TaskContainer';

describe('TaskContainer component', () => {

  const utils = render(<TaskContainer />);
  const add_task_input = utils.getByTestId('add-task-input');
  fireEvent.change(add_task_input, { target: { value: "Title 1" } });
  fireEvent.submit(add_task_input);
  const tasks_element = utils.getByTestId('tasks');
  
  test('should render task with correct title', () => {
    const input_element = tasks_element.getElementsByTagName('input')[1];
    expect(input_element.value).toBe('Title 1');
  });

})