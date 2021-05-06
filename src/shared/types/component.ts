import { ComponentType } from './enums';

export interface IId {

  id: number;
}

export interface IComponent extends IId {

  type: ComponentType;
}

export interface IComponentProps extends IId {

  isDummy: boolean;
  name?: string;
}

export default IComponent;
