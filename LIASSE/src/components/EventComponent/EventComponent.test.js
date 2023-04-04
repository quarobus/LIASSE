import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import EventComponent from './EventComponent';

describe('<EventComponent />', () => {
  test('it should mount', () => {
    render(<EventComponent />);
    
    const eventComponent = screen.getByTestId('EventComponent');

    expect(eventComponent).toBeInTheDocument();
  });
});