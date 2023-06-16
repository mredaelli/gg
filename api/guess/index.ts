import { HttpRequest } from '@azure/functions';
import {
  HttpResponse,
  PoorMansControlFlow,
  getUser,
  adapt,
  resp,
  Game,
  FunctionContext,
} from '../common';

type In = { games: Game[] };
type Out = { updatedGame: Game };

const getGame = (games: Game[] | null): Game => {
  if (!games || games.length == 0) {
    throw new PoorMansControlFlow('', 404);
  }
  const game = games[0];
  if (game.done_at) {
    throw new PoorMansControlFlow('You already nailed this', 200);
  }
  return game;
};

const getGuess = (req: HttpRequest): number => {
  const guessedValue = req.body;
  if (typeof guessedValue != 'number') {
    throw new PoorMansControlFlow('The guess should be a number', 400);
  } else if (!Number.isInteger(guessedValue)) {
    throw new PoorMansControlFlow('The guess should be an integer', 400);
  }
  return guessedValue;
};

const impl = (req: HttpRequest, bindings: In) => {
  const userid = getUser(req);
  const game = getGame(bindings.games);
  if (game.userid !== userid) {
    throw new PoorMansControlFlow('Nice try', 401);
  }

  const guessedValue = getGuess(req);
  let res: HttpResponse;
  let updatedGame = { ...game, tries: game.tries + 1 };
  if (guessedValue > game.number) {
    res = resp('go lower');
  } else if (guessedValue < game.number) {
    res = resp('go higher');
  } else {
    updatedGame = { ...updatedGame, done_at: new Date().toISOString() };
    res = resp('right-ho');
  }
  return { res, outBind: { updatedGame } };
};

export default async (
  context: FunctionContext<{ games: Game; updatedGame: string }>,
  req: HttpRequest,
  games: Game[],
): Promise<void> => adapt<In, Out>(impl, context, req, { games });
