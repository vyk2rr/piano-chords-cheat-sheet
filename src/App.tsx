import { useState } from "react";
import PianoBase from "./PianoBase/PianoBase";
import ChordPalette from "./ChordPalette/ChordPalette";
import type { tChord } from "./PianoBase/PianoBase.types";
import "./App.css";

function App() {
  const [currentChord, setCurrentChord] = useState<tChord>([]);
  const [currentColor, setCurrentColor] = useState<string>("#cccccc");
  const [highlightPlayMode, setHighlightPlayMode] = useState<'chord' | 'arpeggio'>('chord');

  return (
    <div>
      <div style={{ background: currentColor }} className="piano-container">
        <PianoBase highlightOnThePiano={currentChord} highlightPlayMode={highlightPlayMode} />
      </div>

      <div className="play-mode-buttons">
        <button
          className={highlightPlayMode === 'arpeggio' ? 'active' : ''}
          onClick={() => setHighlightPlayMode('arpeggio')}
        >
          Arpegio
        </button>
        <button
          className={highlightPlayMode === 'chord' ? 'active' : ''}
          onClick={() => setHighlightPlayMode('chord')}
        >
          Acorde
        </button>
      </div>

      {/* {highlightPlayMode === 'arpeggio' ? (
        <div>
          <label>
            Duration:
            <input type="number" step="0.1" defaultValue={0.5} />
          </label>
          <label>
            Time:
            <input type="number" step="0.1" defaultValue={0.1} />
          </label>
          <label>
            Velocity:
            <input type="number" step="0.1" min={0} max={1} defaultValue={0.7} />
          </label>
        </div>
      ) : (
        <div>
          <label>
            Duration:
            <input type="number" step="0.1" defaultValue={0.5} />
          </label>
          <label>
            Velocity:
            <input type="number" step="0.1" min={0} max={1} defaultValue={0.7} />
          </label>
        </div>
      )} */}

      <ChordPalette
        params={{
          currentChord,
          setCurrentChord,
          currentColor,
          setCurrentColor,
          octave: 4,
        }}
      />
    </div>
  );
}

export default App;