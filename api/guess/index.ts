import { AzureFunction, HttpRequest } from "@azure/functions";
import { FunctionContext, Game, resp } from '../common';


const httpTrigger: AzureFunction = async (
    context: FunctionContext<{ game: Game, updated_game: Game }>,
    req: HttpRequest,
    game: Game
): Promise<void> => {
    const guessedValue = req.body;
    if (!game) {
        context.res = resp("", 404);
    }
    else if (game.done_at) {
        context.res = resp("You already nailed this");
    }
    else if (typeof guessedValue != "number") {
        context.res = resp("The guess should be a number", 400);
    }
    else if (!Number.isInteger(guessedValue)) {
        context.res = resp("The guess should be an integer", 400);
    } else {
        let updated_game = { ...game, tries: game.tries + 1 }
        if (guessedValue > game.number) {
            context.res = resp("go lower")
        } else if (guessedValue < game.number) {
            context.res = resp("go higher")
        } else {
            updated_game = { ...updated_game, done_at: new Date() }
            context.res = resp("right-ho")
        }
        context.bindings.updated_game = updated_game
    }
};

export default httpTrigger;
