import { ITrain, TrainDirection, TrainSpeed, IMotionSensor, SensorEvent } from '../types';

export default (train: ITrain,
                direction: TrainDirection,
                speed: TrainSpeed,
                sensor: IMotionSensor,
                event: SensorEvent) => new Promise<void>(resolve => {

  if (event === SensorEvent.Enter) {

    sensor.enterStream.subscribe(() => {

      resolve();
    });
  } else {

    sensor.exitStream.subscribe(() => {

      resolve();
    });
  }

  train.move(direction, speed);
});
