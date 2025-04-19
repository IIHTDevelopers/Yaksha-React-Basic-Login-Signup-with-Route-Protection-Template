import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Dashboard from '../../components/Dashboard';
import '@testing-library/jest-dom/extend-expect';

describe('boundary', () => {
    it('DashboardComponent boundary redirects to /login if not authenticated', () => {
        // Simulate not authenticated
        localStorage.removeItem('isAuthenticated');

        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Dashboard />
            </Router>
        );

        // Check if redirected to /login
        expect(history.location.pathname).toBe('/login');
    });

    it('DashboardComponent boundary renders Dashboard if authenticated', () => {
        // Simulate authenticated
        localStorage.setItem('isAuthenticated', 'true');

        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Dashboard />
            </Router>
        );

        // Check if Dashboard content is rendered
        expect(screen.getByText('Welcome to your Dashboard!')).toBeInTheDocument();
        expect(screen.getByText('Logout')).toBeInTheDocument();
    });

    it('DashboardComponent boundary logs out and redirects to /login when Logout button is clicked', () => {
        // Simulate authenticated
        localStorage.setItem('isAuthenticated', 'true');

        const history = createMemoryHistory();
        render(
            <Router history={history}>
                <Dashboard />
            </Router>
        );

        // Click the Logout button
        fireEvent.click(screen.getByText('Logout'));

        // Check if redirected to /login
        expect(history.location.pathname).toBe('/login');
        // Check if isAuthenticated is removed from localStorage
        expect(localStorage.getItem('isAuthenticated')).toBeNull();
    });
});
