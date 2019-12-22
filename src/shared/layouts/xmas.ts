import IBoard from '../types/IBoard';
import IDetectionSensor from '../types/IDetectionSensor';
import IFakeSensor from '../types/IFakeSensor';
import ITrackSwitch from '../types/ITrackSwitch';
import ITrain from '../types/ITrain';

import Board from '../core/board'; 
import DetectionSensor from '../core/detectionSensor';
import TrackSwitch from '../core/trackSwitch';
import Train from '../core/train';
import wait from '../utils/wait';
import { TrainDirection } from '../types/enums';

let b1: IBoard;
let t1: ITrain;
let ts1: ITrackSwitch;
let s1: IFakeSensor;
let s2: IFakeSensor
// let s3: IDetectionSensor;

const initialise = async () => {

  if (t1 === undefined) {

    b1 = new Board();
    await b1.initialise();

    t1 = new Train(1, 99, 99, true);
    ts1 = new TrackSwitch(1, 'A0');
    await ts1.initialise();
  
    s1 = new DetectionSensor(1, 'A1');
    s2 = new DetectionSensor(2, 'A2');
    // s3 = new DetectionSensor(3, 'A3', true);
  }
};

export default async (): Promise<void> => {

  const messagePrefix = 'Xmas layout: ';
  const delay:number = 20000;
  const maxLoops = 3;
  let loopCount = 0;
  
  const handleSensor1Exit = async () => {

    if (loopCount > 0) {

      t1.stop();
      console.log(`${messagePrefix}run complete`);
    }
  };

  const handleSensor2Exit = async () => { 

    if (loopCount === 1) {

      ts1.turn();
    }
  };
  
  return new Promise<void>(async (resolve) => {

    console.log(`${messagePrefix}executing`);
    
    await initialise();

    s1.enterStream.subscribe(() => {});
    s1.exitStream.subscribe(handleSensor1Exit);
    s2.enterStream.subscribe(() => {});
    s2.exitStream.subscribe(handleSensor2Exit);

    t1.move(TrainDirection.Forward);
    await wait(delay);
    // s1.forcePumpEnter();
    // await wait(delay);
    // s1.forcePumpExit();

    for (let i:number = 0; i < maxLoops; i++) {
      
      loopCount = i + 1;
      console.log(`${messagePrefix}loop ${loopCount}`);

      await wait(delay);
      // s2.forcePumpEnter();
      // await wait(delay);
      // s2.forcePumpExit();
    }

    t1.stop();
    await ts1.straight();
    t1.move(TrainDirection.Backward);
    await wait(delay);
    // s1.forcePumpEnter();
    // await wait(delay);
    // s1.forcePumpExit();

    resolve();
  });

  // let loopCount:number = -1;

  // const handleSensor2Exit = async () => {

  //   if (loopCount === -1) {

  //     await ts1.turn();
  //   }

  //   loopCount++;
    
    // if (loopCount === 10) {

    //   t1.stop();
    //   await ts1.straight();
    //   t1.move(TrainDirection.Backward);
    // } else {

    //   await ts1.turn();
    // }
  };

  // await initialise();

  // t1.move(TrainDirection.Forward);

  // await wait(5000);
  // s1.forcePumpExit();

  // await wait(5000);
  // s2.forcePumpExit();
  // Move train (t1) forward
  // When S2 exit
  //   turn track (ts1)
  // Loop (run) for 5 mins
  // When S2 exit
  //   stop train 
  //   straighten track
  //   reverse train (slowly)
  //   When S1 exit (in reverse)
  //     stop train
  //     end
  
  // t1.move(TrainDirection.Forward);


  // await wait(5000);
  // fs1.pumpEnter();