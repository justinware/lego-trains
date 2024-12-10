import { Observable, type Observer } from 'rxjs';
import { Sensor as JFSensor } from 'johnny-five';

import { ComponentType, type IMotionSensor, type ComponentProps } from '../types';
import ComponentBase from './component';

class MotionSensor extends ComponentBase implements IMotionSensor {

  private _$enter: Observable<void>;
  private _$exit: Observable<void>;
  private _enterObserver!: Observer<void>;
  private _exitObserver!: Observer<void>;
  private _sensor?: JFSensor;
  private _minThreshold: number = 12;
  private _isPassing = false;

  constructor(props: ComponentProps, pin: string) {

    super(props, ComponentType.Sensor);

    this._$enter = new Observable((o: Observer<void>) => { this._enterObserver = o; });
    this._$exit = new Observable((o: Observer<void>) => { this._exitObserver = o; });

    if (!this._isDummy) {

      this._sensor = new JFSensor({ pin, freq: 250, threshold: 100 } as any);
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

    const value:number = this._sensor?.analog || 0;

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

    this.log('enter');
    this._enterObserver.next();
  }

  private _pumpExit(): void {

    this.log('exit')
    this._exitObserver.next();
  }

  forcePumpEnter() {

    this._pumpEnter();
  }

  forcePumpExit() {

    this._pumpExit();
  }
}

export default MotionSensor;
