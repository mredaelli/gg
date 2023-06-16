import { AzureFunction, HttpRequest } from "@azure/functions";
import { FunctionContext, resp } from '../common';


const httpTrigger: AzureFunction = async (
    context: FunctionContext<{ gameId: number }>,
    req: HttpRequest,
    gameId: number
): Promise<void> => {
    context.res = resp(gameId)
};

export default httpTrigger;
