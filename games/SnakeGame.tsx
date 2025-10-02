
import React, { useState, useEffect, useCallback } from 'react';
import { useInterval } from '../hooks/useInterval';

const GRID_SIZE = 20;
const TILE_SIZE = 20; // in pixels
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_FOOD = { x: 15, y: 15 };

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

export const SnakeGame: React.FC = () => {
  const [snake, setSnake] = useState<Point[]>(INITIAL_SNAKE);
  const [food, setFood] = useState<Point>(INITIAL_FOOD);
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number | null>(200);

  const resetGame = () => {
    setSnake(INITIAL_SNAKE);
    setFood(INITIAL_FOOD);
    setDirection('RIGHT');
    setIsGameOver(false);
    setScore(0);
    setSpeed(200);
  };

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowUp':
        if (direction !== 'DOWN') setDirection('UP');
        break;
      case 'ArrowDown':
        if (direction !== 'UP') setDirection('DOWN');
        break;
      case 'ArrowLeft':
        if (direction !== 'RIGHT') setDirection('LEFT');
        break;
      case 'ArrowRight':
        if (direction !== 'LEFT') setDirection('RIGHT');
        break;
    }
  }, [direction]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  const generateFood = () => {
    let newFoodPosition: Point;
    do {
      newFoodPosition = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (snake.some(segment => segment.x === newFoodPosition.x && segment.y === newFoodPosition.y));
    setFood(newFoodPosition);
  };
  
  const gameLoop = () => {
    if (isGameOver) {
      setSpeed(null);
      return;
    };
    
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    switch (direction) {
      case 'UP': head.y -= 1; break;
      case 'DOWN': head.y += 1; break;
      case 'LEFT': head.x -= 1; break;
      case 'RIGHT': head.x += 1; break;
    }

    // Check for collisions
    if (
      head.x < 0 || head.x >= GRID_SIZE ||
      head.y < 0 || head.y >= GRID_SIZE ||
      newSnake.some(segment => segment.x === head.x && segment.y === head.y)
    ) {
      setIsGameOver(true);
      return;
    }

    newSnake.unshift(head);

    // Check for food
    if (head.x === food.x && head.y === food.y) {
      setScore(s => s + 1);
      if (speed && speed > 50) setSpeed(s => s ? s - 5 : 200);
      generateFood();
    } else {
      newSnake.pop();
    }
    
    setSnake(newSnake);
  };
  
  useInterval(gameLoop, speed);
  
  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="text-xl font-bold mb-4 text-slate-300">Score: {score}</div>
      <div 
        className="bg-slate-700 border-4 border-slate-600 relative grid"
        style={{ 
          width: `${GRID_SIZE * TILE_SIZE}px`, 
          height: `${GRID_SIZE * TILE_SIZE}px`,
          gridTemplateColumns: `repeat(${GRID_SIZE}, 1fr)`,
        }}
      >
        {isGameOver && (
          <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-10">
            <div className="text-4xl font-bold text-red-500">Game Over</div>
            <button
              onClick={resetGame}
              className="mt-4 bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg"
            >
              Play Again
            </button>
          </div>
        )}
        {snake.map((segment, index) => (
          <div
            key={index}
            className="bg-green-500 rounded-sm"
            style={{ gridColumn: segment.x + 1, gridRow: segment.y + 1 }}
          />
        ))}
        <div
          className="bg-red-500 rounded-full"
          style={{ gridColumn: food.x + 1, gridRow: food.y + 1 }}
        />
      </div>
       <p className="mt-4 text-slate-400 text-sm">Use arrow keys to move</p>
    </div>
  );
};
