import IComponent from './IComponent';
import { TrainDirection, TrainSpeed } from '../types/enums';

interface ITrain extends IComponent {

  move(direction: TrainDirection, speed: TrainSpeed): void;
  stop(): void;
}

export default ITrain;