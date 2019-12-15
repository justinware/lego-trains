import IComponent from './IComponent';

export enum TrackSwitchDirection {
  Left,
  Right
}

export interface ITrackSwitch extends IComponent {

  isTurned: boolean;
  initialise(): Promise<void>;
  turn(): Promise<void>;
  straight(logMessage?: boolean): Promise<void>;
}