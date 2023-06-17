import { Context, HttpRequest } from '@azure/functions';

type JSONable = number | string | JSONable[] | { [key: string]: JSONable };

export type HttpResponse<Res extends JSONable> = {
  status: number;
  body: Res;
  mimetype: string;
};
export const resp = <Resp extends JSONable>(
  body: Resp,
  status = 200,
): HttpResponse<Resp> => ({
  status,
  body,
  mimetype: 'application/json',
});

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

type Impl<In, Out, Res extends JSONable> = (
  req: HttpRequest,
  bindIn: In,
) => { res: Res; outBind: Out };

export const adapt = <In, Out, Res extends JSONable>(
  f: Impl<In, Out, Res>,
  context: Context,
  req: HttpRequest,
  inBind: In,
): void => {
  try {
    const res = f(req, inBind);
    context.res = resp(res.res);
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
