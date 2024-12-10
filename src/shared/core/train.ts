import { Motor } from 'johnny-five';

import { type ITrain, ComponentType, type ComponentProps, TrainDirection, TrainSpeed } from '../types';
import ComponentBase from './component';

class Train extends ComponentBase implements ITrain {

  private _motor?: Motor;

  constructor(props: ComponentProps, pwmPin: number, dirPin: number) {

    super(props, ComponentType.Train);

    if (!this._isDummy) {

      this._motor = new Motor([pwmPin, dirPin]);
    }
  }

  move(direction: TrainDirection, speed: TrainSpeed = TrainSpeed.Medium): void {

    const directionText:string = direction === TrainDirection.Forward ? 'forward' : 'backwards';

    // TODO: Store current direction & speed as private vars

    // TODO: Only do anything if current direction or speed changes, otherwise is a a noop

    this.log(`moving ${directionText} at ${speed} speed`);

    if (!this._isDummy) {

      if (direction === TrainDirection.Forward) {

        this._motor?.start(speed);
      } else {

        this._motor?.reverse(speed);
      }
    }
  }

  stop(): void {

    this.log(`stopped`);

    if (!this._isDummy) {

      this._motor?.stop();
    }
  }
}

export default Train;
