import IBoard from '../shared/types/IBoard';
import ITrain from '../shared/types/ITrain';
import Train from '../shared/core/train';
import Board from '../shared/core/board';
import { TrainDirection, TrainSpeed } from '../shared/types/enums';
import wait from '../shared/utils/wait';

export default async (isDummy: boolean) => {

  const delay:number = 2000;
  const board: IBoard = new Board(1, isDummy);
  await board.initialise();
  const train: ITrain = new Train(1, 3, 12, isDummy);

  train.move(TrainDirection.Forward, TrainSpeed.Medium);
  await wait(delay);
  train.stop();
  // await wait(delay);
  // train.move(TrainDirection.Backward, TrainSpeed.Low);
  // await wait(delay);
  // train.stop();
}