// import Action from '../core/action';
// import { TrainDirection } from '../types/enums';
// import ITrain from '../types/ITrain';
// import IDetectionSensor from '../types/IDetectionSensor';

// // TEMP
// import wait from '../utils/wait';

// class RunTrainUntilSensor extends Action {

//   private _direction: TrainDirection;
//   private _train: ITrain;
//   private _sensor: IDetectionSensor;
  
//   constructor(id: number,
//               order: number,
//               train: ITrain,
//               sensor: IDetectionSensor,
//               direction: TrainDirection = TrainDirection.Forward) {

//     super(id, order);

//     this._direction = direction;
//     this._train = train;
//     this._sensor = sensor;
//   }

//   async execute(): Promise<void> {
    
//     this._train.move(this._direction);
  
//     await wait(5000);

//     this._train.stop();
//   }  
// }

// export default RunTrainUntilSensor;