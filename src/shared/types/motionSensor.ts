import { Observable } from 'rxjs';

import type { Component } from './component';

export interface IMotionSensor extends Component {

  enterStream: Observable<void>;
  exitStream: Observable<void>;
  forcePumpEnter(): void;
  forcePumpExit(): void;
}
