import { ClientPrincipal, GuessResponse } from './models';

const API = import.meta.env.VITE_API;
const AUTH = import.meta.env.VITE_AUTH;

export const getUser = async (): Promise<ClientPrincipal> => {
  const response = await fetch(`${AUTH}/.auth/me`);
  const result = await response.json();
  return result?.clientPrincipal;
};
export const createGame = async (): Promise<number> => {
  const response = await fetch(`${API}/init`, { method: 'PUT' });
  const result = await response.json();
  return result;
};

export const sendGuess = async (
  gameId: number,
  guess: number,
): Promise<GuessResponse> => {
  const response = await fetch(`${API}/guess/${gameId}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(guess),
  });
  const result = await response.json();
  return result;
};
