import { Observable, fromEvent } from 'rxjs';
import { Sensor } from 'johnny-five';

import IDetectionSensor from '../types/IDetectionSensor';

class DetectionSensor implements IDetectionSensor {
  
  private _id: number;
  private _sensor: Sensor;
  private _sensorStream: Observable<number>;
  
  constructor(id: number, pin: string) {

    this._id = id;
    this._sensor = new Sensor(pin);
    // this._sensorStream = fromEvent(this._sensor, 'data');
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