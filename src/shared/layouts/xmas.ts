import IBoard from '../types/IBoard';
import IDetectionSensor from '../types/IDetectionSensor';
import IFakeSensor from '../types/IFakeSensor';
import ITrackSwitch from '../types/ITrackSwitch';
import ITrain from '../types/ITrain';
import ILayout from '../types/ILayout';

import Board from '../core/board';
import DetectionSensor from '../core/detectionSensor';
import TrackSwitch from '../core/trackSwitch';
import Train from '../core/train';
import wait from '../utils/wait';
import { TrainDirection, TrainSpeed } from '../types/enums';

const messagePrefix = 'Xmas layout: ';
const delay:number = 2000;

class XmasLayout implements ILayout {

  private _maxLoops: number;
  private _isDummy: boolean;
  private _loopCount: number = 0;
  private _b1: IBoard;
  private _t1: ITrain;
  private _ts1: ITrackSwitch;
  private _s1: IFakeSensor;
  private _s2: IFakeSensor;

  constructor(maxLoops: number, isDummy: boolean = false) {

    this._maxLoops = maxLoops;
    this._isDummy = isDummy;
  }

  private async _initialise() {

    if (this._b1 === undefined) {
  
      this._b1 = new Board(1, this._isDummy);
      await this._b1.initialise();
  
      this._t1 = new Train(1, 6, 5, this._isDummy);
      this._ts1 = new TrackSwitch(1, 'A0', this._isDummy);
      await this._ts1.initialise();
    
      this._s1 = new DetectionSensor(1, 'A1', this._isDummy);
      this._s2 = new DetectionSensor(2, 'A2', this._isDummy);
    }
  };

  private async _handleSensor1Exit(resolve: (value?: void | PromiseLike<void>) => void) {

    if (this._loopCount > 0) {
      
      this._t1.stop();
      console.log(`${messagePrefix}run complete`);
      
      resolve();
    }
  };

  private async _handleSensor2Enter() { 

    this._loopCount++;
    console.log(`${messagePrefix}loop ${this._loopCount}`);

    if (this._loopCount === 1) {

      this._ts1.turn();
    }
  };

  // private async _handleSensor2Exit() { 

  //   if (this._loopCount === 1) {

  //     this._ts1.turn();
  //   }
  // };
  
  execute(): Promise<void> {

    return new Promise<void>(async (resolve) => {

      console.log(`${messagePrefix}executing`);

      await this._initialise();
  
      this._s1.enterStream.subscribe(() => {});
      this._s1.exitStream.subscribe(() => { this._handleSensor1Exit(resolve); });
      this._s2.enterStream.subscribe(() => { this._handleSensor2Enter(); });
      this._s2.exitStream.subscribe(() => {});
  
      this._t1.move(TrainDirection.Forward, TrainSpeed.Medium);

      if (this._isDummy) {
  
        await wait(delay);
        this._s1.forcePumpEnter();
        await wait(delay);
        this._s1.forcePumpExit();

        // for (let i:number = 0; i < this._maxLoops; i++) {

        //   await wait(delay);
        //   this._s2.forcePumpEnter();
        //   await wait(delay);
        //   this._s2.forcePumpExit();
        // }
      }
  
      // this._t1.stop();
      // await this._ts1.straight();
      // this._t1.move(TrainDirection.Backward, TrainSpeed.Low);
      
      // if (this._isDummy) {
  
      //   await wait(delay);
      //   this._s1.forcePumpEnter();
      //   await wait(delay);
      //   this._s1.forcePumpExit();
      // }
    });
  }
}

export default XmasLayout;