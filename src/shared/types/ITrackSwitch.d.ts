type TTrackSwitchDirection = 'Left' | 'Right';

interface ITrackSwitch {

  id: number;
  direction: TTrackSwitchDirection;
  isOpen: boolean;
  open(): void;
  close(): void;
}

export default ITrackSwitch;