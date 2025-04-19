import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Login from '../../components/Login';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    it('LoginComponent boundary renders Login form', () => {
        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        // Check if the form elements are rendered
        expect(screen.getByPlaceholderText('Username')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
        expect(screen.getAllByText('Login')[0]).toBeInTheDocument(); // Using getAllByText to handle multiple elements
    });

    it('LoginComponent boundary handles user input and form submission with valid credentials', () => {
        const history = createMemoryHistory();
        const user = { username: 'testuser', password: 'password123' };
        localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage

        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        // Simulate user input
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'testuser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'password123' } });

        // Simulate form submission
        fireEvent.click(screen.getAllByText('Login')[1]); // Clicking the button using getAllByText

        // Check if user is marked as authenticated
        expect(localStorage.getItem('isAuthenticated')).toBe('true');

        // Check if redirected to /
        expect(history.location.pathname).toBe('/');
    });

    it('LoginComponent boundary shows alert on invalid credentials', () => {
        window.alert = jest.fn(); // Mock window.alert

        const history = createMemoryHistory();
        const user = { username: 'testuser', password: 'password123' };
        localStorage.setItem('user', JSON.stringify(user)); // Save user data in localStorage

        render(
            <Router history={history}>
                <Login />
            </Router>
        );

        // Simulate user input with invalid credentials
        fireEvent.change(screen.getByPlaceholderText('Username'), { target: { value: 'invaliduser' } });
        fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'wrongpassword' } });

        // Simulate form submission
        fireEvent.click(screen.getAllByText('Login')[1]); // Clicking the button using getAllByText

        // Check if alert is called with the correct message
        expect(window.alert).toHaveBeenCalledWith('Invalid credentials');
    });
});
