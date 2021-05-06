import { IComponent, ComponentType, IComponentProps } from '../types';
import { MAX_PREFIX_LENGTH } from './constants';

const messagePrefixMap = new Map<ComponentType, string>();
messagePrefixMap.set(ComponentType.Board, 'Board');
messagePrefixMap.set(ComponentType.Layout, 'Layout');
messagePrefixMap.set(ComponentType.Sensor, 'Sensor');
messagePrefixMap.set(ComponentType.TrackSwitch, 'Track Switch');
messagePrefixMap.set(ComponentType.Train, 'Train');

abstract class Component implements IComponent {

  private _id: number;
  private _type: ComponentType;
  protected _isDummy: boolean;
  protected _messagePrefix: string;

  constructor({ id, isDummy, name }: IComponentProps, type: ComponentType) {

    this._id = id;
    this._type = type;
    this._isDummy = isDummy;
    this._messagePrefix = name || `${messagePrefixMap.get(type)} ${id}`;
  }

  get id(): number {

    return this._id;
  }

  get type(): ComponentType {

    return this._type;
  }

  protected log(message: string) {

    // TODO: Highlight (with colour) the prefix
    console.log(`${this._messagePrefix.padEnd(MAX_PREFIX_LENGTH)} : ${message}`);
  }
}

export default Component;
