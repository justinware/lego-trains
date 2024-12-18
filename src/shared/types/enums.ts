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
  Low = 50,
  Medium = 100,
  Fast = 200,
}

export enum SensorEvent {
  Enter,
  Exit
}
