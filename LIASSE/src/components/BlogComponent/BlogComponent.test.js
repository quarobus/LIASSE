import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import BlogComponent from './BlogComponent';

describe('<BlogComponent />', () => {
  test('it should mount', () => {
    render(<BlogComponent />);
    
    const blogComponent = screen.getByTestId('BlogComponent');

    expect(blogComponent).toBeInTheDocument();
  });
});