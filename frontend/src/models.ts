export type GuessResponse = 'right-ho' | 'go lower' | 'go higher';
export interface ClientPrincipal {
  userId: string;
  userDetails: string;
}

export type PastGuess = { guess: number; response: GuessResponse };
export const N = 10000;

export interface Game {
  id: number;
  pastGuesses: PastGuess[];
  done: boolean;
}
export type State = { game?: Game };
