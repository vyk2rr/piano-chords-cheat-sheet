import { useState } from "react";
import PianoBase from "./PianoBase/PianoBase";
import ChordPalette from "./ChordPalette/ChordPalette";
import type { tChord } from "./PianoBase/PianoBase.types";
import "./App.css";

function App() {
  const [currentChord, setCurrentChord] = useState<tChord>([]);
  const [currentColor, setCurrentColor] = useState<string>("#cccccc");

  return (
    <div>
      <div style={{ background: currentColor }} className="piano-container">
        <PianoBase highlightOnThePiano={currentChord} />
      </div>
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
