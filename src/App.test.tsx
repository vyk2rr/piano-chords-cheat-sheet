import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import ChordPalette from './ChordPalette';
import '@testing-library/jest-dom';

// Jest usará automáticamente el mock corregido en __mocks__/tone.js

describe('App', () => {
  test('renders the piano and chord palette correctly', () => {
    render(<App />);
    
    const pianoContainer = screen.getByTestId('piano-base').parentElement;
    expect(pianoContainer).toBeInTheDocument();
    expect(pianoContainer).toHaveClass('piano-container');
    expect(pianoContainer).toHaveStyle('background: rgb(204, 204, 204)');

    expect(screen.getByPlaceholderText(/Filter chords/i)).toBeInTheDocument();
  });

  test('clicking a chord highlights keys on the piano and changes the background color', async () => {
    render(<App />);

    const pianoContainer = screen.getByTestId('piano-base').parentElement;
    expect(pianoContainer).toHaveStyle('background: rgb(204, 204, 204)');

    const cMajorButton = await screen.findByRole('button', { name: /Cmaj C E G/i });
    fireEvent.click(cMajorButton);

    await waitFor(() => {
      expect(pianoContainer).not.toHaveStyle('background: rgb(204, 204, 204)');
    });

    const pianoBase = screen.getByTestId('piano-base');
    const c4Key = pianoBase.querySelector('[data-note="C4"]');
    const e4Key = pianoBase.querySelector('[data-note="E4"]');
    const g4Key = pianoBase.querySelector('[data-note="G4"]');

    expect(c4Key).toHaveClass('highlight-group-1');
    expect(e4Key).toHaveClass('highlight-group-1');
    expect(g4Key).toHaveClass('highlight-group-1');
  });

  test('filters chords when typing in the search input', async () => {
    render(<App />);

    const searchInput = screen.getByPlaceholderText(/Filter chords/i);

    expect(await screen.findByRole('button', { name: /Cmaj C E G/i })).toBeInTheDocument();
    expect(await screen.findByRole('button', { name: /Dmaj D F# A/i })).toBeInTheDocument();

    fireEvent.change(searchInput, { target: { value: 'D' } });

    await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Cmaj C E G/i })).not.toBeInTheDocument();
    });
    
    expect(await screen.findByRole('button', { name: /Dmaj D F# A/i })).toBeInTheDocument();
  });

  test('toggles inversions visibility', async () => {
    render(<App />);

    const inversionsButton = screen.getByRole('button', { name: /inversion/i });
    fireEvent.click(inversionsButton);

    // Ajusta el regex según el texto real del botón en la UI
    const invertedCmaj = await screen.findByRole('button', { name: /Cmaj \(1ª\) E G C/i });
    expect(invertedCmaj).toBeInTheDocument();
    expect(invertedCmaj).toHaveClass('inverted');

    fireEvent.click(inversionsButton);

    await waitFor(() => {
        expect(screen.queryByRole('button', { name: /Cmaj\/E E G C/i })).not.toBeInTheDocument();
    });
  });
});