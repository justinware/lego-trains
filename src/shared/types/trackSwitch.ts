import type { Component } from './component';

export interface ITrackSwitch extends Component {

  isTurned: boolean;
  initialise(): Promise<void>;
  turn(): Promise<void>;
  straight(logMessage?: boolean): Promise<void>;
}
