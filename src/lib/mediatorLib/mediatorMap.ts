import { injectable } from "inversify";
import { IMediatorMap } from "./interfaces/IMediatorMap";

@injectable()
export abstract class MediatorMap implements IMediatorMap {
  private _map = new Map();

  set(req: any, handler: any) {
    this._map.set(req, handler);
  }

  get(req: any) {
    return this._map.get(req);
  }
}
