import { Observable } from 'rxjs';

interface IDetectionSensor {

  id: number;
  enterStream: Observable<void>;
  exitStream: Observable<void>;
}

export default IDetectionSensor;