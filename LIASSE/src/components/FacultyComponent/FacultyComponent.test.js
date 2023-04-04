import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import FacultyComponent from './FacultyComponent';

describe('<FacultyComponent />', () => {
  test('it should mount', () => {
    render(<FacultyComponent />);
    
    const facultyComponent = screen.getByTestId('FacultyComponent');

    expect(facultyComponent).toBeInTheDocument();
  });
});