
import React from 'react';
import type { Game } from '../types';
import { HomeIcon } from './icons';

interface GameWrapperProps {
  game: Game;
  onGoHome: () => void;
}

export const GameWrapper: React.FC<GameWrapperProps> = ({ game, onGoHome }) => {
  const GameComponent = game.component;

  return (
    <div className="w-full max-w-4xl h-[90vh] flex flex-col bg-slate-800 rounded-2xl shadow-2xl p-4 sm:p-6">
      <header className="flex items-center justify-between mb-4 border-b border-slate-700 pb-3">
        <h2 className="text-3xl font-bold text-teal-400">{game.title}</h2>
        <button
          onClick={onGoHome}
          className="flex items-center gap-2 bg-slate-700 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
          aria-label="Go to Homepage"
        >
          <HomeIcon className="w-5 h-5" />
          <span className="hidden sm:inline">Home</span>
        </button>
      </header>
      <main className="flex-grow flex items-center justify-center bg-slate-900 rounded-lg overflow-hidden">
        <GameComponent />
      </main>
    </div>
  );
};
