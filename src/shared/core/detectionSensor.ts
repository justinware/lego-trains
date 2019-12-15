import { Observable, fromEvent } from 'rxjs';
import { Sensor } from 'johnny-five';

import { ComponentType } from '../types/enums';
import ComponentBase from './componentBase';
import IDetectionSensor from '../types/IDetectionSensor';

class DetectionSensor extends ComponentBase implements IDetectionSensor {
  
  private _sensor: Sensor;
  private _sensorStream: Observable<number>;
  
  constructor(id: number, pin: string) {

    super(id, ComponentType.Sensor);
    
    this._sensor = new Sensor({ pin, freq: 100, threshold: 50 } as any);
    // this._sensorStream = fromEvent(this._sensor, 'data');

    this._sensor.on('change', () => {
      
      console.log(this._sensor.analog);
    });
  }
  
  get enterStream(): Observable<void> {

    return undefined;
  }

  get exitStream(): Observable<void> {

    return undefined;
  };
}

export default DetectionSensor;