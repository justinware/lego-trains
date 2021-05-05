import { Observable } from 'rxjs';

import IComponent from './component';

export interface IMotionSensor extends IComponent {

  enterStream: Observable<void>;
  exitStream: Observable<void>;
  forcePumpEnter(): void;
  forcePumpExit(): void;
}

export default IMotionSensor;
