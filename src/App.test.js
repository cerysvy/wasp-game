import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

//testing core engine of the game...

//test shoot method reduces score on a wasp
//check 0 health => dead?
//check queen dies all die
//check all die game over
