
import React, { useState, useEffect } from 'react';

const EMOJIS = ['🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼'];

interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const shuffle = <T,>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

const generateCards = (): Card[] => {
  const duplicatedEmojis = [...EMOJIS, ...EMOJIS];
  return shuffle(duplicatedEmojis).map((emoji, index) => ({
    id: index,
    emoji: emoji,
    isFlipped: false,
    isMatched: false,
  }));
};

export const MemoryGame: React.FC = () => {
  const [cards, setCards] = useState<Card[]>(generateCards());
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [moves, setMoves] = useState<number>(0);
  const [isGameWon, setIsGameWon] = useState<boolean>(false);

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [firstIndex, secondIndex] = flippedIndices;
      const firstCard = cards[firstIndex];
      const secondCard = cards[secondIndex];

      if (firstCard.emoji === secondCard.emoji) {
        // Match
        const newCards = cards.map((card) =>
          card.emoji === firstCard.emoji ? { ...card, isMatched: true } : card
        );
        setCards(newCards);
      }
      
      // Flip back after a delay
      const timeoutId = setTimeout(() => {
        setFlippedIndices([]);
      }, 1000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [flippedIndices, cards]);

  useEffect(() => {
    if (cards.length > 0 && cards.every(card => card.isMatched)) {
      setIsGameWon(true);
    }
  }, [cards]);

  const handleCardClick = (index: number) => {
    if (flippedIndices.length === 2 || cards[index].isFlipped || cards[index].isMatched) {
      return;
    }

    const newFlippedIndices = [...flippedIndices, index];
    setFlippedIndices(newFlippedIndices);
    setMoves(prevMoves => prevMoves + (newFlippedIndices.length === 1 ? 1 : 0));
    
    setCards(currentCards => 
      currentCards.map((card, i) => 
        i === index ? { ...card, isFlipped: true } : card
      )
    );
  };
  
  useEffect(() => {
    if (flippedIndices.length < 2) {
        setCards(currentCards =>
            currentCards.map((card, i) => {
                if (!card.isMatched && !flippedIndices.includes(i)) {
                    return { ...card, isFlipped: false };
                }
                return card;
            })
        );
    }
  }, [flippedIndices]);

  const resetGame = () => {
    setCards(generateCards());
    setFlippedIndices([]);
    setMoves(0);
    setIsGameWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
        {isGameWon ? (
            <div className="text-center">
                <h2 className="text-4xl font-bold text-teal-400 mb-4">You Win!</h2>
                <p className="text-lg text-slate-300 mb-6">Total moves: {moves}</p>
                 <button onClick={resetGame} className="bg-teal-500 hover:bg-teal-600 text-white font-bold py-2 px-6 rounded-lg">
                    Play Again
                </button>
            </div>
        ) : (
            <>
                <div className="text-2xl font-bold mb-6 text-slate-300">Moves: {moves}</div>
                <div className="grid grid-cols-4 gap-4">
                    {cards.map((card, index) => (
                    <div
                        key={card.id}
                        className={`w-20 h-20 rounded-lg cursor-pointer transform transition-transform duration-500 [transform-style:preserve-3d] ${card.isFlipped || card.isMatched ? '[transform:rotateY(180deg)]' : ''}`}
                        onClick={() => handleCardClick(index)}
                    >
                        <div className="absolute w-full h-full bg-slate-700 rounded-lg flex items-center justify-center text-4xl [backface-visibility:hidden]">
                           ?
                        </div>
                        <div className="absolute w-full h-full bg-teal-500 rounded-lg flex items-center justify-center text-4xl [transform:rotateY(180deg)] [backface-visibility:hidden]">
                           {card.emoji}
                        </div>
                    </div>
                    ))}
                </div>
                 <button onClick={resetGame} className="mt-8 bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-6 rounded-lg">
                    Reset
                </button>
            </>
        )}
    </div>
  );
};
