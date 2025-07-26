import React from 'react';

export type PlayMode = 'chord' | 'arpeggio';

export interface PlayModeToggleProps {
  highlightPlayMode: PlayMode;
  setHighlightPlayMode: React.Dispatch<React.SetStateAction<PlayMode>>;
}

const PlayModeToggle: React.FC<PlayModeToggleProps> = ({ highlightPlayMode, setHighlightPlayMode }) => (
  <div className="play-mode-buttons">
    <button
      className={highlightPlayMode === 'arpeggio' ? 'active' : ''}
      aria-pressed={highlightPlayMode === 'arpeggio'}
      aria-label="Play mode: Arpegio"
      onClick={() => setHighlightPlayMode('arpeggio')}
    >
      Arpegio
    </button>
    <button
      className={highlightPlayMode === 'chord' ? 'active' : ''}
      aria-pressed={highlightPlayMode === 'chord'}
      aria-label="Play mode: Chord"
      onClick={() => setHighlightPlayMode('chord')}
    >
      Acorde
    </button>
  </div>
);

export default PlayModeToggle;