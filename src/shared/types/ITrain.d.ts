import IComponent from './IComponent';
import { TrainDirection } from '../types/enums';

interface ITrain extends IComponent {

  move(direction: TrainDirection, speed?: number): void;
  stop(): void;
}

export default ITrain;