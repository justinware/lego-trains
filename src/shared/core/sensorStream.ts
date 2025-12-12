import { Sensor } from 'johnny-five';
import { Observable, tap, type Observer } from 'rxjs';

const DEFAULT_FREQUENCY = 100;
const DATA = 'data';
const THRESHOLD = 50;

export class SensorSource {
  private _sensor: Sensor;
  private _stream$: Observable<number>;
  private _lastValue: number | undefined;

  constructor(pin: string) {
    this._sensor = new Sensor({ pin, freq: DEFAULT_FREQUENCY });

    this._stream$ = new Observable((observer: Observer<number>) => {
      this._sensor.on(DATA, () => {
        observer.next(this._sensor.raw);
      });
    }).pipe(
      tap((value) => {
        if (this._lastValue === undefined) {
          this._lastValue = value;
          return value;
        }

        if (value > this._lastValue + THRESHOLD) {
          console.log('Enter');
        } else if (value < this._lastValue - THRESHOLD) {
          console.log('Exit');
        }

        this._lastValue = value;
      })
    );
  }

  get stream() {
    return this._stream$;
  }
}
