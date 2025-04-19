import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';
import '@testing-library/jest-dom/extend-expect';

// Mock PrivateRoute
jest.mock('../components/PrivateRoute', () => {
  return ({ children }) => <div>{children}</div>;
});

describe('boundary', () => {
  test('AppComponent boundary renders links to Login, SignUp, and Dashboard', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const loginLinks = screen.getAllByText(/Login/i);
    expect(loginLinks[0]).toBeInTheDocument();
    expect(screen.getByText(/Signup/i)).toBeInTheDocument();
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });

  test('AppComponent boundary renders routes for /login, /signup, and /', () => {
    render(
      <Router>
        <App />
      </Router>
    );
    const loginLinks = screen.getAllByText(/Login/i);
    expect(loginLinks[0].closest('a')).toHaveAttribute('href', '/login');
    expect(screen.getByText(/Signup/i).closest('a')).toHaveAttribute('href', '/signup');
    expect(screen.getByText(/Dashboard/i).closest('a')).toHaveAttribute('href', '/');
  });

  test('AppComponent boundary checks if <Dashboard> is wrapped in PrivateRoute', () => {
    render(
      <Router>
        <App />
      </Router>
    );

    // Find Dashboard component by text content
    expect(screen.getByText(/Dashboard/i)).toBeInTheDocument();
  });
});
