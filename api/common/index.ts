import { Context, HttpRequest } from '@azure/functions';

export const resp = (body: object | string | number, status = 200) => ({
  status,
  body: JSON.stringify(body),
  mimetype: 'application/json',
});
export type HttpResponse = ReturnType<typeof resp>;

export interface FunctionContext<Out = void> extends Context {
  bindings: Out;
  res: {
    status?: number;
    body: string;
    mimetype: string;
  };
}

export class PoorMansControlFlow extends Error {
  constructor(public msg: string, public errorCode: number) {
    super();
  }
}

type Impl<In, Out> = (
  req: HttpRequest,
  bindIn: In,
) => { res: HttpResponse; outBind: Out };

export const adapt = <In, Out>(
  f: Impl<In, Out>,
  context: Context,
  req: HttpRequest,
  inBind: In,
): void => {
  try {
    const res = f(req, inBind);
    context.res = res.res;
    context.bindings = Object.fromEntries(
      Object.entries(res.outBind).map(([key, value]) => [
        key,
        JSON.stringify(value),
      ]),
    );
  } catch (e) {
    if (e instanceof PoorMansControlFlow) {
      context.res = resp(e.msg, e.errorCode);
    } else {
      context.res = resp("It's me, not you", 500);
    }
  }
};

export const getUser = (req: HttpRequest): string => {
  const userid = req.headers['x-ms-client-principal-name'];
  if (!userid || userid == '') {
    throw new PoorMansControlFlow('Who dis?', 401);
  }
  return userid;
};

export interface GameId {
  id: number;
}
export interface Game extends GameId {
  id: number;
  userid: string;
  number: number;
  created_at: string;
  tries: number;
  done_at: string | null;
}
