import Layout from '../core/layout';
import Board from '../core/board';
import Train from '../core/train';
import MotionSensor from '../core/motionSensor';
import { IBoard, ITrain, IMotionSensor } from '../types';
import { TrainDirection, TrainSpeed, SensorEvent } from '../types/enums';
import wait from '../utils/wait';
import { WAIT_TIMES } from '../core/constants';
import runTrainUntilSensor from '../actions/runTrainUntilSensor';

class TestLayout extends Layout {

  private _board: IBoard;
  private _train: ITrain;
  private _sensor1: IMotionSensor;
  private _sensor2: IMotionSensor;

  protected async initialise(): Promise<void> {

    this._board = new Board(1, this._isDummy);
    this._train = new Train(1, 5, 6, this._isDummy);
    this._sensor1 = new MotionSensor(1, 'A1', this._isDummy);
    this._sensor2 = new MotionSensor(2, 'A2', this._isDummy);

    await this._board.initialise();

    // Initialise any track switches

    await wait(WAIT_TIMES.SMALL);
  }

  protected async executeStart(): Promise<void> {

    if (this._isDummy) {

      setTimeout(() => { this._sensor2.forcePumpExit(); }, WAIT_TIMES.LARGE);
    }

    await runTrainUntilSensor(this._train, TrainDirection.Forward, TrainSpeed.Low, this._sensor2, SensorEvent.Exit);
  }

  protected async executeLoop(): Promise<void> {

    // Move Train forward at medium speed, when Sensor 2 pumps Exit, then resolve
    this._train.move(TrainDirection.Forward, TrainSpeed.Medium);
  }

  protected async executeEnd(): Promise<void> {

    // Move Train backwards slowly until Sensor 1 pumps Exit, then stop the train, then resolve
    this._train.move(TrainDirection.Backward, TrainSpeed.Low);
  }
}

export default TestLayout;
