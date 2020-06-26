import { Motor } from 'johnny-five';

import { ComponentType, TrainDirection, TrainSpeed } from '../types/enums';
import Component from './component';
import ITrain from '../types/ITrain';

class Train extends Component implements ITrain {

  private _motor: Motor = undefined;

  constructor(id: number, pwmPin: number, dirPin: number, isDummy: boolean = false) {

    super(id, ComponentType.Train, isDummy);

    if (!this._isDummy) {

      this._motor = new Motor([pwmPin, dirPin]);
    }
  }

  move(direction: TrainDirection, speed: TrainSpeed = TrainSpeed.Medium): void {
   
    const directionText:string = direction === TrainDirection.Forward ? 'forward' : 'backwards';
    
    console.log(`${this._messagePrefix}moving ${directionText}`);

    if (!this._isDummy) {

      if (direction === TrainDirection.Forward) {
        
        this._motor.start(100);
      } else {
        
        this._motor.reverse(50);
      }
    }
  }
  
  stop(): void {
  
    console.log(`${this._messagePrefix}stopped`);

    if (!this._isDummy) {

      this._motor.stop();
    }
  }
}

export default Train;