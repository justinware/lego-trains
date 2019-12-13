import { Servo } from 'johnny-five';

import { TrackSwitchDirection , ITrackSwitch } from '../types/ITrackSwitch';
import wait from '../utils/wait';

const minAngle: number = 25;
const maxAngle: number = 105;
const adjustAngle: number = 3;
const moveInterval: number = 400;
const adjustInterval: number = 50;

class TrackSwitch implements ITrackSwitch {
  
  private _id: number;
  private _isTurned: boolean = false;
  private _straightAngle: number = minAngle;
  private _turnAngle: number = maxAngle;
  private _servo: Servo = undefined;

  constructor(id: number, pin: string, direction: TrackSwitchDirection = TrackSwitchDirection.Left) {

    let startAngle = minAngle;
    
    this._id = id;

    // TODO: Allow right-hand switches
    // if (direction == TrackSwitchDirection.Right) {

    //   this._straightAngle = maxAngle;
    //   this._turnAngle = minAngle;
    //   startAngle = maxAngle;
    // }

    this._servo = new Servo({
      pin,
      range: [minAngle, maxAngle],
      startAt: startAngle
    });

    console.log(`${this.messagePrefix}servo initialised on pin ${this._servo.pin} at ${this._servo.position}°`);
  }
  
  private get messagePrefix(): string {

    return `Track Switch ${this._id}: `;
  }

  private get status(): string {

    return this._isTurned ? 'turned' : 'straight';
  }

  get id(): number {

    return this._id;
  }

  get isTurned(): boolean {

    return this._isTurned;
  }

  async initialise(): Promise<void> {

    await this.straight(false);

    console.log(`${this.messagePrefix}ready`);
  }

  async turn(): Promise<void> {
  
    this._servo.to(this._turnAngle, moveInterval);
    await wait(moveInterval);

    this._servo.to(this._turnAngle - adjustAngle, adjustInterval);
    await wait(adjustInterval);

    this._isTurned = true;
    console.log(`${this.messagePrefix}${this.status}`);
  }
  
  async straight(logMessage: boolean = true): Promise<void> {
    
    this._servo.to(this._straightAngle, moveInterval);
    await wait(moveInterval);

    this._servo.to(this._straightAngle + adjustAngle, adjustInterval);
    await wait(adjustInterval);

    this._isTurned = false;
    if (logMessage) {
        
      console.log(`${this.messagePrefix}${this.status}`);
    }
  }
}

export default TrackSwitch;