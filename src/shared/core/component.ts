import IComponent from '../types/IComponent';
import { ComponentType } from '../types/enums';

abstract class Component implements IComponent {

  private _id: number;
  private _type: ComponentType;
  protected _isDummy: boolean;
  protected _messagePrefix: string;
  
  constructor(id: number, type: ComponentType, isDummy: boolean = false) {

    this._id = id;
    this._type = type;
    this._isDummy = isDummy;

    const getMessagePrefix = (description: string): string => `${description} ${id}: `;

    switch (type) {

      case ComponentType.Action: {

        this._messagePrefix = getMessagePrefix('Action');
        break;
      }

      case ComponentType.Sensor: {

        this._messagePrefix = getMessagePrefix('Sensor');
        break;
      }

      case ComponentType.TrackSwitch: {

        this._messagePrefix = getMessagePrefix('Track Switch');
        break;
      }

      case ComponentType.Train: {

        this._messagePrefix = getMessagePrefix('Train');
        break;
      }
    }
  }

  get id(): number {

    return this._id;
  }

  get type(): ComponentType {

    return this._type;
  }
}

export default Component;