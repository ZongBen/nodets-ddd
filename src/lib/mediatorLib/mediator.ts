import { Container, inject, injectable } from "inversify";
import type { IMediator } from "./interfaces/IMediator";
import type { IReqHandler } from "./interfaces/IReqHandler";
import type { INotification } from "./interfaces/INotification";
import { IMediatorMap } from "./interfaces/IMediatorMap";
import { MEDIATOR_TYPES } from "./types";

@injectable()
export class Mediator implements IMediator {
  constructor(
    @inject(Container) private readonly _container: Container,
    @inject(MEDIATOR_TYPES.IMediatorMap)
    private readonly _mediatorMap: IMediatorMap,
  ) {}

  send<TRes>(req: any): Promise<TRes> {
    const handler = this._mediatorMap.get(req.constructor) as new (
      ...args: any[]
    ) => IReqHandler<any, TRes>;
    if (!handler) {
      throw new Error("handler not found");
    }
    const handlerInstance = this._container.resolve(handler);
    console.log("send to handler:", handlerInstance.constructor.name);
    return handlerInstance.handle(req);
  }

  publish<T extends INotification<T>>(event: T): Promise<void> {
    for (const handler of event.getSubscribers()) {
      const handlerInstance = this._container.resolve(handler);
      console.log("publish to handler:", handlerInstance.constructor.name);
      handlerInstance.handle(event);
    }
    return Promise.resolve();
  }
}
