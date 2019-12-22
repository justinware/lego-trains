import Action from '../core/action';
import ITrain from '../types/ITrain';
import IDetectionSensor from '../types/IDetectionSensor';

// TEMP
import wait from '../utils/wait';

class StopTrainWhenSensor extends Action {

  private _train: ITrain;
  private _sensor: IDetectionSensor;
  
  constructor(id: number,
              order: number,
              train: ITrain,
              sensor: IDetectionSensor) {

    super(id, order);

    this._train = train;
    this._sensor = sensor;
  }

  async execute(): Promise<void> {
    

  }  
}

export default StopTrainWhenSensor;