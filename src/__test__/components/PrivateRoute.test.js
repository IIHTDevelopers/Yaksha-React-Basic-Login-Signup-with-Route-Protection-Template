import React from 'react';
import { render } from '@testing-library/react';
import { MemoryRouter, Route } from 'react-router-dom';
import PrivateRoute from '../../components/PrivateRoute';
import '@testing-library/jest-dom/extend-expect';

// Mock the localStorage
const mockGetItem = jest.fn();

beforeAll(() => {
    global.localStorage.setItem('isAuthenticated', 'true');
});

describe('boundary', () => {
    it('PrivateRouteComponent boundary renders children when authenticated', () => {
        mockGetItem.mockReturnValue('true');
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: mockGetItem,
            },
            writable: true,
        });

        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <div>Protected Content</div>
                </PrivateRoute>
            </MemoryRouter>
        );

        expect(getByText('Protected Content')).toBeInTheDocument();
    });

    it('PrivateRouteComponent boundary redirects to /login when not authenticated', () => {
        mockGetItem.mockReturnValue(null);
        Object.defineProperty(window, 'localStorage', {
            value: {
                getItem: mockGetItem,
            },
            writable: true,
        });

        const { getByText } = render(
            <MemoryRouter initialEntries={['/']}>
                <PrivateRoute>
                    <div>Protected Content</div>
                </PrivateRoute>
                <Route path="/login">
                    <div>Login Page</div>
                </Route>
            </MemoryRouter>
        );

        expect(getByText('Login Page')).toBeInTheDocument();
    });
});
