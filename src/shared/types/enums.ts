export enum ComponentType {
  App,
  Board,
  Layout,
  Sensor,
  TrackSwitch,
  Train,
}

export enum TrackSwitchDirection {
  Left,
  Right,
}

export enum TrainDirection {
  Forward,
  Backward,
}

export enum TrainSpeed {
  //Low = 125,
  Low = 100,
  Medium = 150,
  Fast = 175,
  Full = 240,
}

export enum SensorEvent {
  Enter,
  Exit,
}
