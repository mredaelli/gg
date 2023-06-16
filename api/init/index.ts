import { AzureFunction, HttpRequest } from "@azure/functions";
import { GameId, FunctionContext, resp, Game } from '../common';


const httpTrigger: AzureFunction = async (
    context: FunctionContext<{ games: Game, updatedGame: string }>,
    req: HttpRequest,
    games: GameId[]
): Promise<void> => {
    const userid = req.headers['x-ms-client-principal-name'];
    if (!userid || userid == "") {
        context.res = resp("", 401)
    }
    const game = games[0]
    context.res = resp({id: game.id, user: userid})
    context.bindings.updatedGame = JSON.stringify({ ...game, userid: userid })
};

export default httpTrigger;
