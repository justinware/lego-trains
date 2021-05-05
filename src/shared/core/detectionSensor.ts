import { Observable, Observer } from 'rxjs';
import { Sensor } from 'johnny-five';

import { ComponentType } from '../types/enums';
import Component from './component';
import IDetectionSensor from '../types/IDetectionSensor';

class DetectionSensor extends Component implements IDetectionSensor {

  private _$enter: Observable<void>;
  private _$exit: Observable<void>;
  private _enterObserver: Observer<void>;
  private _exitObserver: Observer<void>;
  private _sensor: Sensor;
  private _minThreshold: number = 12;
  private _isPassing = false;

  constructor(id: number, pin: string, isDummy: boolean = false) {

    super(id, ComponentType.Sensor, isDummy);

    this._$enter = new Observable((o: Observer<void>) => { this._enterObserver = o; });
    this._$exit = new Observable((o: Observer<void>) => { this._exitObserver = o; });

    if (!this._isDummy) {

      this._sensor = new Sensor({ pin, freq: 250, threshold: 100 } as any);
      // this._sensorStream = fromEvent(this._sensor, 'data');

      this._sensor.on('change', this._handleSensorChange.bind(this));
    }
  }

  get enterStream(): Observable<void> {

    return this._$enter;
  }

  get exitStream(): Observable<void> {

    return this._$exit;
  }

  private _handleSensorChange():void {

    const value:number = this._sensor.analog;

    if (!this._isPassing && value > this._minThreshold) {

      this._isPassing = true;
      this._pumpEnter();
    }

    if (this._isPassing && value < this._minThreshold) {

      this._isPassing = false;
      this._pumpExit();
    }
  };

  private _pumpEnter(): void {

    console.log(`${this._messagePrefix}enter`);

    this._enterObserver.next();
  }

  private _pumpExit(): void {

    console.log(`${this._messagePrefix}exit`);

    this._exitObserver.next();
  }

  forcePumpEnter() {

    this._pumpEnter();
  }

  forcePumpExit() {

    this._pumpExit();
  }
}

export default DetectionSensor;
