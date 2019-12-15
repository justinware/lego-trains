import IComponent from '../types/IComponent';
import { ComponentType } from '../types/enums';

abstract class ComponentBase implements IComponent {

  private _id: number;
  private _type: ComponentType;
  private _messagePrefix: string;
  
  constructor(id: number, type: ComponentType) {

    this._id = id;
    this._type = type;

    const getMessagePrefix = (description: string): string => `${description} ${id}: `;

    switch (type) {

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

  protected get messagePrefix(): string {

    return this._messagePrefix;
  }
}

export default ComponentBase;