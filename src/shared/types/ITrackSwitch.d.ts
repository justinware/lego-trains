import IComponent from './IComponent';

interface ITrackSwitch extends IComponent {

  isTurned: boolean;
  initialise(): Promise<void>;
  turn(): Promise<void>;
  straight(logMessage?: boolean): Promise<void>;
}

export default ITrackSwitch;