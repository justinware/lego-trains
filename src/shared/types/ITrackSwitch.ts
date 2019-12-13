export enum TrackSwitchDirection {
  Left,
  Right
}

export interface ITrackSwitch {

  id: number;
  isTurned: boolean;
  initialise(): Promise<void>;
  turn(): Promise<void>;
  straight(logMessage?: boolean): Promise<void>;
}