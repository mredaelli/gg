import { HttpRequest } from '@azure/functions';
import { getUser, adapt, Game, FunctionContext } from '../common';

type In = { games: Game[] };
type Out = { updatedGame: Game };

const impl = (req: HttpRequest, bindings: In) => {
  const userid = getUser(req);
  const game = bindings.games[0];
  return {
    res: { id: game.id }, // A, because my mom just told me to
    outBind: { updatedGame: { ...game, userid: userid } },
  };
};

export default async (
  context: FunctionContext<{ games: Game; updatedGame: string }>,
  req: HttpRequest,
  games: Game[],
): Promise<void> =>
  adapt<In, Out, Pick<Game, 'id'>>(impl, context, req, { games });
