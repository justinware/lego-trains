import chalk, { ChalkFunction } from 'chalk';

import { IComponent, ComponentType, IComponentProps } from '../types';
import { MAX_PREFIX_LENGTH } from './constants';

interface IPrefixDetails {

  name: string;
  decorate: ChalkFunction
}

const messagePrefixMap = new Map<ComponentType, IPrefixDetails>();
messagePrefixMap.set(ComponentType.App, { name: 'App', decorate: chalk.whiteBright });
messagePrefixMap.set(ComponentType.Board, { name: 'Board', decorate: chalk.green });
messagePrefixMap.set(ComponentType.Layout, { name: 'Layout', decorate: chalk.magenta });
messagePrefixMap.set(ComponentType.Sensor, { name: 'Sensor', decorate: chalk.yellow });
messagePrefixMap.set(ComponentType.TrackSwitch, { name: 'Track Switch', decorate: chalk.blue });
messagePrefixMap.set(ComponentType.Train, { name: 'Train', decorate: chalk.cyan });

abstract class Component implements IComponent {

  private _id: number;
  private _type: ComponentType;
  protected _isDummy: boolean;
  protected _messagePrefix: string;

  constructor({ id, isDummy, name }: IComponentProps, type: ComponentType) {

    this._id = id;
    this._type = type;
    this._isDummy = isDummy;
    this._messagePrefix = name || `${messagePrefixMap.get(type).name} ${id}`;
  }

  get id(): number {

    return this._id;
  }

  get type(): ComponentType {

    return this._type;
  }

  protected log(message: string) {

    const { decorate } = messagePrefixMap.get(this._type);
    const prefix = decorate(this._messagePrefix
                                .toUpperCase()
                                .replace(' ', '_')
                                .padStart(MAX_PREFIX_LENGTH));

    console.log(`[${prefix}] ${(message)}`);
  }
}

export default Component;
