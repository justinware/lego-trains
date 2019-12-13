import { Observable, fromEvent } from 'rxjs';
import { Sensor } from 'johnny-five';

import IDetectionSensor from '../types/IDetectionSensor';

class DetectionSensor implements IDetectionSensor {
  
  private _id: number;
  private _sensor: Sensor;
  private _sensorStream: Observable<number>;
  
  constructor(id: number, pin: string) {

    this._id = id;
    this._sensor = new Sensor({ pin, freq: 100, threshold: 50 } as any);
    // this._sensorStream = fromEvent(this._sensor, 'data');

    this._sensor.on('change', () => {
      
      console.log(this._sensor.analog);
    });
  }
  
  get id(): number {

    return this._id;
  }

  get enterStream(): Observable<void> {

    return undefined;
  }

  get exitStream(): Observable<void> {

    return undefined;
  };
}

export default DetectionSensor;