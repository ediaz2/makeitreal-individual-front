import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders', () => {
    render(<Button>Hello</Button>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });

  it('renders with a different color', () => {
    render(<Button className="red">Hello</Button>);
    expect(screen.getByText('Hello')).toHaveClass('red');
  });

  it('calls onClick', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Hello</Button>);
    screen.getByText('Hello').click();
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
