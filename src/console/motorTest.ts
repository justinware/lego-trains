import { Motor } from 'johnny-five';

import five from 'johnny-five';

// var configs = five.Motor SHIELD_CONFIGS.ARDUINO_MOTOR_SHIELD_R3_1;

// import IBoard from '../shared/types/board';
// import ITrain from '../shared/types/ITrain';
// import Train from '../shared/core/train';
// import Board from '../shared/core/board';
// import { TrainDirection, TrainSpeed } from '../shared/types/enums';
// import wait from '../shared/utils/wait';

import Board from '../shared/core/board';
import wait from '../shared/utils/wait';
import Train from '../shared/core/train';
import { TrainDirection, TrainSpeed } from '../shared/types';
import MotionSensor from '../shared/core/motionSensor';

// export default async (isDummy: boolean) => {

//   const delay:number = 2000;
//   const board: IBoard = new Board(1, isDummy);
//   await board.initialise();
//   const train: ITrain = new Train(1, 3, 12, isDummy);

//   train.move(TrainDirection.Forward, TrainSpeed.Medium);
//   await wait(delay);
//   train.stop();
//   // await wait(delay);
//   // train.move(TrainDirection.Backward, TrainSpeed.Low);
//   // await wait(delay);
//   // train.stop();
// }

const main = async () => {

  let passCount = 0;

  const board = new Board({ id: 1, isDummy: false });
  await board.initialise();

  // const sensor = new MotionSensor({ id: 1, isDummy: false}, 'A0');

  // sensor.enterStream.subscribe(() => { console.log('Passing'); passCount++ });

  // while (passCount < 10) {

  //   await wait(100);
  // }
  const train = new Train({ id: 1, isDummy: false }, 0, 0);

  train.stop();

  train.move(TrainDirection.Forward, TrainSpeed.Medium);

  await wait(60 * 1000 * 10);

  train.stop();

  // await wait(5000);

  // train.move(TrainDirection.Backward, TrainSpeed.Low);

  // await wait(10000);

  // train.stop();
}

main();
