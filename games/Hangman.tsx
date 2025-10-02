
import React, { useState, useEffect, useCallback } from 'react';

const WORDS = ["react", "typescript", "tailwind", "component", "javascript", "developer", "arcade", "gaming"];
const ALPHABET = "abcdefghijklmnopqrstuvwxyz".split('');
const MAX_WRONG_GUESSES = 6;

const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

const HangmanDrawing: React.FC<{ numberOfGuesses: number }> = ({ numberOfGuesses }) => {
  const HEAD = <div key="head" className="w-12 h-12 border-4 border-slate-300 rounded-full absolute top-[50px] right-[-22px]" />;
  const BODY = <div key="body" className="w-1 h-24 bg-slate-300 absolute top-[98px] right-0" />;
  const RIGHT_ARM = <div key="right_arm" className="w-20 h-1 bg-slate-300 absolute top-[120px] right-[-80px] rotate-[-30deg]" />;
  const LEFT_ARM = <div key="left_arm" className="w-20 h-1 bg-slate-300 absolute top-[120px] right-0 rotate-[30deg]" />;
  const RIGHT_LEG = <div key="right_leg" className="w-24 h-1 bg-slate-300 absolute top-[210px] right-[-90px] rotate-[60deg]" />;
  const LEFT_LEG = <div key="left_leg" className="w-24 h-1 bg-slate-300 absolute top-[210px] right-[-5px] rotate-[-60deg]" />;
  const BODY_PARTS = [HEAD, BODY, RIGHT_ARM, LEFT_ARM, RIGHT_LEG, LEFT_LEG];

  return (
    <div className="relative h-64 w-48">
      {BODY_PARTS.slice(0, numberOfGuesses)}
      <div className="h-12 w-1 bg-slate-300 absolute top-0 right-0" />
      <div className="h-1 w-48 bg-slate-300 ml-20" />
      <div className="h-64 w-1 bg-slate-300 ml-20" />
      <div className="h-1 w-64 bg-slate-300" />
    </div>
  );
};

export const HangmanGame: React.FC = () => {
  const [wordToGuess, setWordToGuess] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState<string[]>([]);

  const wrongGuesses = guessedLetters.filter(letter => !wordToGuess.includes(letter));
  const isLoser = wrongGuesses.length >= MAX_WRONG_GUESSES;
  const isWinner = wordToGuess.split("").every(letter => guessedLetters.includes(letter));

  const addGuessedLetter = useCallback((letter: string) => {
    if (guessedLetters.includes(letter) || isLoser || isWinner) return;
    setGuessedLetters(currentLetters => [...currentLetters, letter]);
  }, [guessedLetters, isWinner, isLoser]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      if (key.match(/^[a-z]$/)) {
        e.preventDefault();
        addGuessedLetter(key);
      }
    };
    document.addEventListener("keypress", handler);
    return () => document.removeEventListener("keypress", handler);
  }, [addGuessedLetter]);

  const resetGame = () => {
    setWordToGuess(getRandomWord());
    setGuessedLetters([]);
  };

  return (
    <div className="flex flex-col items-center p-4 gap-8">
      <div className="text-3xl font-bold text-center">
        {isWinner && <span className="text-green-500">You Win! - Refresh to play again</span>}
        {isLoser && <span className="text-red-500">Nice Try! - Word was: {wordToGuess}</span>}
      </div>
      <HangmanDrawing numberOfGuesses={wrongGuesses.length} />
      <div className="flex gap-4 text-4xl tracking-widest font-mono uppercase">
        {wordToGuess.split("").map((letter, index) => (
          <span key={index} className="border-b-4 border-slate-500 w-10 text-center">
            <span style={{ visibility: guessedLetters.includes(letter) || isLoser ? 'visible' : 'hidden' }}>
              {letter}
            </span>
          </span>
        ))}
      </div>
      <div className="flex flex-wrap gap-2 justify-center max-w-lg">
        {ALPHABET.map(letter => {
          const isGuessed = guessedLetters.includes(letter);
          const isIncorrect = isGuessed && !wordToGuess.includes(letter);
          return (
            <button
              key={letter}
              onClick={() => addGuessedLetter(letter)}
              disabled={isGuessed || isWinner || isLoser}
              className={`w-10 h-10 text-xl font-bold uppercase rounded-md transition-colors
                ${isGuessed && wordToGuess.includes(letter) ? 'bg-green-600 text-white' : ''}
                ${isIncorrect ? 'bg-red-600 text-white' : ''}
                ${!isGuessed ? 'bg-slate-600 hover:bg-slate-500' : ''}
                disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {letter}
            </button>
          );
        })}
      </div>
        {(isWinner || isLoser) && (
            <button onClick={resetGame} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg">
                Play Again
            </button>
        )}
    </div>
  );
};
