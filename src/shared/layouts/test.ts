import Layout from '../core/layout';
import Board from '../core/board';
import Train from '../core/train';
import MotionSensor from '../core/motionSensor';
import TrackSwitch from '../core/trackSwitch';
import { IBoard, ITrain, IMotionSensor, ITrackSwitch, IComponentProps } from '../types';
import { TrainDirection, TrainSpeed, SensorEvent } from '../types/enums';
import wait from '../utils/wait';
import { WAIT_TIMES } from '../core/constants';
import runTrainUntilSensor from '../actions/runTrainUntilSensor';

const TRAIN_PARK_SPEED = TrainSpeed.Low;
const TRAIN_PARK_DURATION = WAIT_TIMES.MEDIUM;
const TRAIN_RUN_SPEED = TrainSpeed.Medium;
const TRAIN_RUN_DURATION = WAIT_TIMES.LARGE;

class TestLayout extends Layout {

  private _board: IBoard;
  private _train: ITrain;
  private _sensor1: IMotionSensor;
  private _sensor2: IMotionSensor;
  private _switch: ITrackSwitch;

  protected async initialise(): Promise<void> {

    const baseProps: IComponentProps = { id: 1, isDummy: this._isDummy };

    this._board = new Board({ ...baseProps });
    this._train = new Train({ ...baseProps, name: 'Xmas Train' }, 5, 6);
    this._sensor1 = new MotionSensor({ ...baseProps, name: 'Siding Sensor' }, 'A1');
    this._sensor2 = new MotionSensor({ ...baseProps, id: 2, name: 'Loop Sensor' }, 'A2');
    this._switch = new TrackSwitch({ ...baseProps, name: 'Siding Switch' }, 'A0');

    await this._board.initialise();
    await this._switch.initialise();

    if (this._isDummy) {

      await wait(WAIT_TIMES.SMALL);
    }
  }

  protected async executeStart(): Promise<void> {

    if (this._isDummy) {

      setTimeout(() => { this._sensor2.forcePumpExit(); }, TRAIN_PARK_DURATION);
    }

    await runTrainUntilSensor(this._train, TrainDirection.Forward, TRAIN_PARK_SPEED, this._sensor2, SensorEvent.Exit);
    await this._switch.turn();
  }

  protected async executeLoop(): Promise<void> {

    if (this._isDummy) {

      setTimeout(() => { this._sensor2.forcePumpExit(); }, TRAIN_RUN_DURATION);
    }

    await runTrainUntilSensor(this._train, TrainDirection.Forward, TRAIN_RUN_SPEED, this._sensor2, SensorEvent.Exit);
  }

  protected async executeEnd(): Promise<void> {

    this._train.stop();
    await this._switch.straight();

    if (this._isDummy) {

      setTimeout(() => { this._sensor1.forcePumpExit(); }, TRAIN_PARK_DURATION);
    }

    await runTrainUntilSensor(this._train, TrainDirection.Backward, TRAIN_PARK_SPEED, this._sensor1, SensorEvent.Exit);
    this._train.stop();
  }
}

export default TestLayout;
