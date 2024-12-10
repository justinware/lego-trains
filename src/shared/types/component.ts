import { ComponentType } from './enums';

export interface Id {
  id: number;
}

export interface Component extends Id {
  type: ComponentType;
}

export interface ComponentProps extends Id {
  isDummy: boolean;
  name?: string;
}
