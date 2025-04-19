import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Signup from '../../components/Signup';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
  it('SignupComponent boundary renders Signup form', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Signup />
      </Router>
    );

    // Check if the form elements are rendered
    expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getAllByText('Sign Up')[0]).toBeInTheDocument(); // Using getAllByText to handle multiple elements
  });

  it('SignupComponent boundary handles user input and form submission', () => {
    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Signup />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getAllByText('Sign Up')[1]); // Clicking the button using getAllByText

    // Check if user data is saved in localStorage
    const userData = JSON.parse(localStorage.getItem('user'));
    expect(userData).toEqual({ username: 'testuser', password: 'password123' });

    // Check if redirected to /login
    expect(history.location.pathname).toBe('/login');
  });

  it('SignupComponent boundary shows success alert on account creation', () => {
    window.alert = jest.fn(); // Mock window.alert

    const history = createMemoryHistory();
    render(
      <Router history={history}>
        <Signup />
      </Router>
    );

    // Simulate user input
    fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

    // Simulate form submission
    fireEvent.click(screen.getAllByText('Sign Up')[1]); // Clicking the button using getAllByText

    // Check if alert is called with the correct message
    expect(window.alert).toHaveBeenCalledWith('Account created successfully!');
  });
});
