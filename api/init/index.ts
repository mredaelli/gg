import { HttpRequest } from '@azure/functions';
import { getUser, adapt, resp, Game, FunctionContext } from '../common';

type In = { games: Game[] };
type Out = { updatedGame: Game };

const impl = (req: HttpRequest, bindings: In) => {
  const userid = getUser(req);
  const game = bindings.games[0];
  return {
    res: resp(game.id),
    outBind: { updatedGame: { ...game, userid: userid } },
  };
};

export default async (
  context: FunctionContext<{ games: Game; updatedGame: string }>,
  req: HttpRequest,
  games: Game[],
): Promise<void> => adapt<In, Out>(impl, context, req, { games });
