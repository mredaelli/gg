import { AzureFunction, HttpRequest } from "@azure/functions";
import { Context } from "vm";
import { HttpResponse, resp, Game } from '../common';

class PoorMansControlFlow extends Error {
    constructor(public msg: string, public errorCode: number) { super() }
}

const getUser = (req: HttpRequest): string => {
    const userid = req.headers['x-ms-client-principal-name'];
    if (!userid || userid == "") {
        throw new PoorMansControlFlow("Who dis?", 401)
    }
    return userid
}

type Impl<In, Out> = (req: HttpRequest, bindIn: In) => { res: HttpResponse, outBind: Out };


const impl = (req: HttpRequest, bindings: { games: Game[] }) => {
    const userid = getUser(req);
    const game = bindings.games[0]
    return { res: resp(game.id), outBind: { updatedGame: { ...game, userid: userid } } }
}
const adapt = <In, Out>(f: Impl<In, Out>, context: Context, req: HttpRequest, inBind: In): void => {
    try {
        const res = f(req, inBind)
        context.res = res.res
        delete res.res
        context.bindings = Object.fromEntries(
            Object.entries(res).map(([key, value]) => [key, JSON.stringify(value)])
        )
    } catch (e) {
        if (e instanceof PoorMansControlFlow) {
            context.res = resp(e.msg, e.errorCode)
        } else {
            context.res = resp("It's me, not you", 500)
        }
    }
}
const httpTrigger: AzureFunction = async (
    context: Context,
    req: HttpRequest,
    games: Game[]
): Promise<void> => adapt(impl, context, req, { games })

export default httpTrigger;
