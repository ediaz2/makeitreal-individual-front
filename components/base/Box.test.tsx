import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Box } from './Box';

describe('Box', () => {
  it('renders', () => {
    render(<Box>Hello</Box>);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
