
import type { Game } from './types';
import { TicTacToeGame } from './games/TicTacToe';
import { SnakeGame } from './games/SnakeGame';
import { MemoryGame } from './games/MemoryGame';
import { HangmanGame } from './games/Hangman';

export const GAMES: Game[] = [
  {
    id: 'tic-tac-toe',
    title: 'Tic Tac Toe',
    description: "The classic game of X's and O's. Challenge a friend or the unbeatable AI.",
    component: TicTacToeGame,
    imageUrl: 'https://picsum.photos/seed/tictactoe/400/300'
  },
  {
    id: 'snake-game',
    title: 'Snake Game',
    description: 'Control the snake to eat the food and grow longer, but don\'t hit the walls or yourself!',
    component: SnakeGame,
    imageUrl: 'https://picsum.photos/seed/snake/400/300'
  },
  {
    id: 'memory-game',
    title: 'Memory Game',
    description: 'Test your memory by finding all the matching pairs of cards.',
    component: MemoryGame,
    imageUrl: 'https://picsum.photos/seed/memory/400/300'
  },
  {
    id: 'hangman-game',
    title: 'Hangman',
    description: 'Guess the hidden word letter by letter before you run out of chances.',
    component: HangmanGame,
    imageUrl: 'https://picsum.photos/seed/hangman/400/300'
  }
];
