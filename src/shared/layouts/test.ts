import { Subscription } from 'rxjs';

import Layout from '../core/layout';
import Board from '../core/board';
import Train from '../core/train';
import DetectionSensor from '../core/detectionSensor';
import IBoard from '../types/IBoard';
import ITrain from '../types/ITrain';
import IDetectionSensor from '../types/IDetectionSensor';
import { TrainDirection, TrainSpeed } from '../types/enums';
import wait from '../utils/wait';
import { WAIT_TIMES } from '../core/constants';

class TestLayout extends Layout {

  private _board: IBoard;
  private _train: ITrain;
  private _sensor1: IDetectionSensor;
  private _sensor2: IDetectionSensor;
  private _sensor2ExitSubscription: Subscription;

  protected async initialise(): Promise<void> {

    this._board = new Board(1, this._isDummy);
    this._train = new Train(1, 5, 6, this._isDummy);
    this._sensor1 = new DetectionSensor(1, 'A1', this._isDummy);
    this._sensor2 = new DetectionSensor(2, 'A2', this._isDummy);
    this._sensor2ExitSubscription = this._sensor2.exitStream.subscribe(() => { });

    await this._board.initialise();

    // Initialise any track switches

    await wait(WAIT_TIMES.SMALL);
  }

  protected async executeStart(): Promise<void> {

    // const trainOnLoop = this._sensor2.exitStream.toPromise();

    // Move Train forward slowly until Sensor 2 pumps Exit, then resolve
    this._train.move(TrainDirection.Forward, TrainSpeed.Low);

    if (this._isDummy) {

      await wait(WAIT_TIMES.MEDIUM);
      this._sensor2.forcePumpExit();
    }

    // await this._sensor2.exitStream.toPromise();
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
