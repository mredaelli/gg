import { Context } from '@azure/functions';

export const resp = (body: any, status: number = 200) => ({
  status,
  body: JSON.stringify(body),
  mimetype: 'application/json',
});

export interface FunctionContext<Bindings = void> extends Context {
  bindings: Bindings;
  res: {
    status?: number;
    body: string;
    mimetype: string;
  };
}

export interface GameId {
  id: number;
}
export interface Game extends GameId {
  id: number;
  userId: string;
  number: number;
  created_at: string;
  tries: number;
  done_at: string | null;
}
