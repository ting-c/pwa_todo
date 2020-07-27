import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TaskContainer from '../TaskContainer';

describe('TaskContainer component', () => {

  let tasks_element;
  let completed_tasks_element;
  
  beforeEach(() => {
    const utils = render(<TaskContainer />);
    const add_task_input = utils.getByTestId('add-task-input');
    fireEvent.change(add_task_input, { target: { value: "Title 1" } });
    fireEvent.submit(add_task_input);
    tasks_element = utils.getByTestId('tasks');
    completed_tasks_element = utils.getByTestId('completed-tasks');   
  });
  
  test('should render task with correct title', () => {
    const input_element = tasks_element.getElementsByTagName('div')[1];
    expect(input_element.value).toBe('Title 1');
  });

  test('should render the completed task in completed-tasks when checkbox is checked', () => {
    const checkbox = tasks_element.getElementsByTagName("div")[0];
    fireEvent.click(checkbox);
    const input_element = completed_tasks_element.getElementsByTagName('div')[1];
    expect(input_element.value).toBe('Title 1');
  });

  test('should NOT render the completed task in tasks when checkbox is checked', () => {
    const checkbox = tasks_element.getElementsByTagName("div")[0];
    fireEvent.click(checkbox);
    const input_element = tasks_element.getElementsByTagName("div")[1];
    expect(input_element).toBeUndefined();
  });

})