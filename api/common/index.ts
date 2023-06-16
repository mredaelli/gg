import { Context, } from "@azure/functions";

export const resp = (body: any, status: number = 200) => ({ status, body: JSON.stringify(body), mimetype: "application/json" });

export interface FunctionContext<Bindings = void> extends Context {
    bindings: Bindings
    res: {
        status?: number
        body: string
        mimetype: string
    }
}

export interface Game {
    id: number,
    userId: string,
    number: number,
    created_at: Date,
    tries: number,
    done_at: Date | null,
}
