import { Motor } from 'johnny-five';

import { ComponentType, TrainDirection } from '../types/enums';
import Component from './component';
import ITrain from '../types/ITrain';

class Train extends Component implements ITrain {

  private _motor: Motor = undefined;

  constructor(id: number, pwmPin: number, dirPin: number, isDummy: boolean = false) {

    super(id, ComponentType.Train, isDummy);

    //this._motor = new Motor([pwmPin, dirPin]);
  }

  move(direction: TrainDirection, speed?: number): void {
   
    const directionText:string = direction === TrainDirection.Forward ? 'forward' : 'backwards';
    
    console.log(`${this._messagePrefix}moving ${directionText}`);
  }
  
  stop(): void {
  
    console.log(`${this._messagePrefix}stopped`);
  }
}

export default Train;