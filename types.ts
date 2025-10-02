
import type React from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  component: React.FC;
  imageUrl: string;
}
