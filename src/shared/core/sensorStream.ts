import { Sensor } from 'johnny-five';
import {
  BehaviorSubject,
  distinctUntilChanged,
  filter,
  map,
  pairwise,
  tap,
} from 'rxjs';
import StreamSource from '../base/stream';

const DEFAULT_FREQUENCY = 150;
const DATA = 'data';
const IDLE_THRESHOLD = 5;
const PASS_THRESHOLD = 100;

const PIN_0 = 'A0';
const PIN_1 = 'A1';
const PIN_2 = 'A2';

type SensorPin = typeof PIN_0 | typeof PIN_1 | typeof PIN_2;

export const ENTER = 'enter';
export const EXIT = 'exit';
export const IDLE = 'idle';

type SensorState = typeof ENTER | typeof EXIT | typeof IDLE;

export class SensorSource extends StreamSource<number> {
  private _sensor: Sensor;
  private _stateStream: BehaviorSubject<SensorState>;

  constructor(pin: SensorPin) {
    super();

    this._stateStream = new BehaviorSubject<SensorState>(IDLE);
    this._stateStream.subscribe((state) => {
      console.log('Sensor: ', state);
    });

    this._sensor = new Sensor({ pin, freq: DEFAULT_FREQUENCY });
    this._sensor.on(DATA, () => {
      this.push(this._sensor.analog);
    });

    this.listen();
  }

  get state(): SensorState {
    return this._stateStream.getValue();
  }

  get stateStream() {
    return this._stateStream.asObservable();
  }

  private listen() {
    this.stream
      .pipe(
        distinctUntilChanged(),
        pairwise(),
        tap(([previous, current]) => {
          console.log(
            'previous:',
            previous,
            'current:',
            current,
            'delta:',
            current - previous
          );
        }),
        map(([previous, current]) => current - previous),
        filter(
          (delta) => this.state === IDLE && Math.abs(delta) > IDLE_THRESHOLD
        ),
        map((delta) => {
          if (this.state === IDLE && delta > PASS_THRESHOLD) {
            console.log(ENTER);
            this._stateStream.next(ENTER);
            setTimeout(() => {
              console.log(IDLE);
              this._stateStream.next(IDLE);
            }, 1600);
          }
        })
      )
      .subscribe();
  }
}
