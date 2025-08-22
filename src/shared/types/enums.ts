export enum ComponentType {
  App,
  Board,
  Layout,
  Sensor,
  TrackSwitch,
  Train
}

export enum TrackSwitchDirection {
  Left,
  Right
}

export enum TrainDirection {
  Forward,
  Backward
}

export enum TrainSpeed {
  Low = 125,
  Medium = 150,
  Fast = 200,
  Full = 255,
}

export enum SensorEvent {
  Enter,
  Exit
}
