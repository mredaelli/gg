import {
    AzureFunction,
    Context,
    HttpRequest,
} from "@azure/functions";
import { v4 as uuidv4 } from 'uuid';
import { GameInit } from '../common/models';

const resp = (body: string, status: number = 200) => ({ status, body });

const randomInt = (N: number): number => Math.floor(Math.random() * N) + 1;

interface FunctionContext extends Context {
    // bindings: {
    //     myQueue: string[]
    // }
    res: {
        status?: number
        body: string
        game: GameInit
    }
}
const httpTrigger: AzureFunction = async (
    context: FunctionContext,
    req: HttpRequest,
): Promise<void> => {
    context.log("triggered")
    const game: GameInit = {
        number: randomInt(10000),
        id: uuidv4(),
        userId: 'me'
    }
    context.res = { ...resp(game.id), game: game };
};

export default httpTrigger;
