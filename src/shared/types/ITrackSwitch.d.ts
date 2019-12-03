export enum TrackSwitchDirection {
  Left,
  Right
}

interface ITrackSwitch {

  id: number;
  direction: TrackSwitchDirection;
  isOpen: boolean;
  open(): void;
  close(): void;
}

export default ITrackSwitch;