import {
    AzureFunction,
    Context,
    HttpRequest,
} from "@azure/functions";
import { Game } from '../common/models';

const resp = (body: string, status: number = 200) => ({ status, body });

interface FunctionContext extends Context {
    bindings: {
        game: Game
    }
    res: {
        status?: number
        body: string
    }
}
const httpTrigger: AzureFunction = async (
    context: FunctionContext,
    req: HttpRequest,
    game: Game
): Promise<void> => {
    context.log("triggered")
    context.res = resp(game.id)
};

export default httpTrigger;
