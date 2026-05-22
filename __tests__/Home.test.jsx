import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import React from 'react';

// Create a mock login form component for testing (or import your actual component if desired)
const MockLoginForm = () => (
  <form>
    <h1>Login to Career Clarity</h1>
    <label htmlFor="email">Email</label>
    <input id="email" type="email" required />
    <button type="submit">Submit</button>
  </form>
);

describe('Login UI - Unit Tests', () => {
  it('renders the login header text', () => {
    render(<MockLoginForm />);
    const heading = screen.getByRole('heading', { name: /Login to Career Clarity/i });
    expect(heading).toBeInTheDocument();
  });

  it('checks if input elements exist and are marked as required', () => {
    render(<MockLoginForm />);
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('required');
  });
});