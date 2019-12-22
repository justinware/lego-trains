import IAction from '../types/IAction';
import { ComponentType } from '../types/enums';
import Component from './component';

abstract class Action extends Component implements IAction {

  private _order: number;
  
  constructor(id: number, order: number) {

    super(id, ComponentType.Action);

    this._order = order;
  }

  get order(): number {

    return this._order;
  }

  abstract execute(): Promise<void>;
}

export default Action;