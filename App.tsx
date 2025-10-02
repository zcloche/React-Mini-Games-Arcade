
import React, { useState } from 'react';
import { Homepage } from './components/Homepage';
import { GameWrapper } from './components/GameWrapper';
import type { Game } from './types';
import { GAMES } from './constants';

const App: React.FC = () => {
  const [currentGameId, setCurrentGameId] = useState<string | null>(null);

  const handleSelectGame = (game: Game) => {
    setCurrentGameId(game.id);
  };

  const handleGoHome = () => {
    setCurrentGameId(null);
  };

  const currentGame = GAMES.find(g => g.id === currentGameId);

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-center p-4">
      {currentGame ? (
        <GameWrapper game={currentGame} onGoHome={handleGoHome} />
      ) : (
        <Homepage onSelectGame={handleSelectGame} />
      )}
    </div>
  );
};

export default App;
