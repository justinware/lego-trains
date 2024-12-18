import type { Component } from './component';

import { TrainDirection, TrainSpeed } from './enums';

export interface ITrain extends Component {

  move(direction: TrainDirection, speed: TrainSpeed): void;
  stop(): void;
}
