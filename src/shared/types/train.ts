import IComponent from './component';
import { TrainDirection, TrainSpeed } from './enums';

export interface ITrain extends IComponent {

  move(direction: TrainDirection, speed: TrainSpeed): void;
  stop(): void;
}

export default ITrain;
