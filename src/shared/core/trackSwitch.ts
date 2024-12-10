import { Servo } from 'johnny-five';

import { type ITrackSwitch, ComponentType, type ComponentProps } from '../types';
import ComponentBase from './component';
import wait from '../utils/wait';

const minAngle: number = 25;
const maxAngle: number = 105;
const adjustAngle: number = 3;
const moveInterval: number = 400;
const adjustInterval: number = 50;

class TrackSwitch extends ComponentBase implements ITrackSwitch {

  private _isTurned: boolean = false;
  private _straightAngle: number = minAngle;
  private _turnAngle: number = maxAngle;
  private _servo?: Servo;

  constructor(props: ComponentProps, pin: string) {

    super(props, ComponentType.TrackSwitch);

    if (!this._isDummy) {

      let startAngle = minAngle;
      this._servo = new Servo({
        pin,
        range: [minAngle, maxAngle],
        startAt: startAngle
      });

      this.log(`servo initialised on pin ${this._servo.pin} at ${this._servo.position}°`);
    }
  }

  private get status(): string {

    return this._isTurned ? 'turned' : 'straight';
  }

  get isTurned(): boolean {

    return this._isTurned;
  }

  async initialise(): Promise<void> {

    await this.straight(false);
    this.log('ready');
  }

  async turn(): Promise<void> {

    if (!this._isDummy) {

      this._servo?.to(this._turnAngle, moveInterval);
    }
    await wait(moveInterval);

    if (!this._isDummy) {

      this._servo?.to(this._turnAngle - adjustAngle, adjustInterval);
    }
    await wait(adjustInterval);

    this._isTurned = true;
    this.log(this.status);
  }

  async straight(logMessage: boolean = true): Promise<void> {

    if (!this._isDummy) {

      this._servo?.to(this._straightAngle, moveInterval);
    }
    await wait(moveInterval);

    if (!this._isDummy) {

      this._servo?.to(this._straightAngle + adjustAngle, adjustInterval);
    }
    await wait(adjustInterval);

    this._isTurned = false;
    if (logMessage) {

      this.log(this.status);
    }
  }
}

export default TrackSwitch;
