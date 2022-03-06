import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../../pages/index';
import Link from 'next/link';

beforeEach(() => {
  render(<HomePage />);
});

test('rendering a form for Bank of azeroth', () => {
  render(<Link history="/bank-of-azeroth"></Link>);

  expect(screen.getByText('Bank of Azeroth')).toBeInTheDocument();
});
