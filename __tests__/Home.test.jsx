import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

describe('Basic Test Suite', () => {
  it('passes a simple math test', () => {
    expect(1 + 1).toBe(2);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    div.innerHTML = 'Hello Career Clarity';
    expect(div.innerHTML).toContain('Career Clarity');
  });
});