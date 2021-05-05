import IComponent from './IComponent';

import { Observable } from 'rxjs';

interface IDetectionSensor extends IComponent {

  enterStream: Observable<void>;
  exitStream: Observable<void>;
  forcePumpEnter(): void;
  forcePumpExit(): void;
}

export default IDetectionSensor;
