import { Servo } from 'johnny-five';

import ITrackSwitch from '../types/ITrackSwitch';
import { ComponentType } from '../types/enums';
import Component from './component';
import wait from '../utils/wait';

const minAngle: number = 25;
const maxAngle: number = 105;
const adjustAngle: number = 3;
const moveInterval: number = 400;
const adjustInterval: number = 50;

class TrackSwitch extends Component implements ITrackSwitch {
  
  private _isTurned: boolean = false;
  private _straightAngle: number = minAngle;
  private _turnAngle: number = maxAngle;
  private _servo: Servo = undefined;

  constructor(id: number, pin: string, isDummy: boolean = false) {

    super(id, ComponentType.TrackSwitch, isDummy);
    
    if (!this._isDummy) {

      let startAngle = minAngle;
      this._servo = new Servo({
        pin,
        range: [minAngle, maxAngle],
        startAt: startAngle
      });
  
      console.log(`${this._messagePrefix}servo initialised on pin ${this._servo.pin} at ${this._servo.position}°`);
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

    console.log(`${this._messagePrefix}ready`);
  }

  async turn(): Promise<void> {
  
    if (!this._isDummy) {

      this._servo.to(this._turnAngle, moveInterval);
    }
    await wait(moveInterval);

    if (!this._isDummy) {

      this._servo.to(this._turnAngle - adjustAngle, adjustInterval);
    }
    await wait(adjustInterval);

    this._isTurned = true;
    console.log(`${this._messagePrefix}${this.status}`);
  }
  
  async straight(logMessage: boolean = true): Promise<void> {
    
    if (!this._isDummy) {

      this._servo.to(this._straightAngle, moveInterval);
    }
    await wait(moveInterval);

    if (!this._isDummy) {

      this._servo.to(this._straightAngle + adjustAngle, adjustInterval);
    }
    await wait(adjustInterval);

    this._isTurned = false;
    if (logMessage) {
        
      console.log(`${this._messagePrefix}${this.status}`);
    }
  }
}

export default TrackSwitch;