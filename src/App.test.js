import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';

  test('start button takes us to wasp game', () => {
    render(<App />);
    const startButton = screen.getByText(/start/i);
    fireEvent.click(startButton);
    const queenWaspScore = screen.getByText(/80/i);
    expect(queenWaspScore).toBeInTheDocument();
  });