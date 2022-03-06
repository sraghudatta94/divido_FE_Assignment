import { render, screen, fireEvent } from '@testing-library/react';
import HomePage from '../../pages/index';
import App from '../../pages/_app';

beforeEach(() => {
  render(<HomePage />);
});

test('should render the Page Header', async () => {
  const heading = screen.getByText(/Select any bank for Application Form/i);
  expect(heading).toBeInTheDocument();
});

test('should render bank links', async () => {
  const link1 = screen.getByText('Bank of Azeroth');
  expect(link1).toBeInTheDocument();

  const link2 = screen.getByText('Middle Earth Bank');
  expect(link2).toBeInTheDocument();

  const link3 = screen.getByText('Naboo Bank');
  expect(link3).toBeInTheDocument();

  const link4 = screen.getByText('SBI');
  expect(link4).toBeInTheDocument();
});

test('should have dynamic href', async () => {
  const link1 = screen.getByTestId('bank-of-azeroth');
  expect(link1).toHaveAttribute('href', '/bank-of-azeroth');
});

test('should have dynamic href', async () => {
  const link2 = screen.getByTestId('middle-earth-bank');
  expect(link2).toHaveAttribute('href', '/middle-earth-bank');
});

test('should have dynamic href', async () => {
  const link3 = screen.getByTestId('naboo-bank');
  expect(link3).toHaveAttribute('href', '/naboo-bank');
});
