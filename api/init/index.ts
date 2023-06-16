import { AzureFunction, HttpRequest } from "@azure/functions";
import { GameId, FunctionContext, resp } from '../common';


const httpTrigger: AzureFunction = async (
    context: FunctionContext<{ gameId: number }>,
    req: HttpRequest,
    game: GameId[]
): Promise<void> => {
    context.res = resp(game[0].id)
};

export default httpTrigger;
