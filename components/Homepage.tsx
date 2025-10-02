
import React from 'react';
import type { Game } from '../types';
import { GAMES } from '../constants';

interface HomepageProps {
  onSelectGame: (game: Game) => void;
}

const GameCard: React.FC<{ game: Game; onSelect: () => void }> = ({ game, onSelect }) => {
  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg transform hover:scale-105 transition-transform duration-300 ease-in-out flex flex-col">
      <img src={game.imageUrl} alt={game.title} className="w-full h-40 object-cover" />
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-teal-400 mb-2">{game.title}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow">{game.description}</p>
        <button
          onClick={onSelect}
          className="mt-auto w-full bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-200"
        >
          Play Game
        </button>
      </div>
    </div>
  );
};

export const Homepage: React.FC<HomepageProps> = ({ onSelectGame }) => {
  return (
    <div className="w-full max-w-6xl mx-auto">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white tracking-tight mb-2">
          React Mini-Games Arcade
        </h1>
        <p className="text-lg text-slate-400">Choose a game to play</p>
      </header>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {GAMES.map(game => (
          <GameCard key={game.id} game={game} onSelect={() => onSelectGame(game)} />
        ))}
      </main>
      <footer className="text-center mt-12 text-slate-500">
        <p>Built with React, TypeScript, and Tailwind CSS.</p>
      </footer>
    </div>
  );
};
