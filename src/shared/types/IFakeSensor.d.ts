import IDetectionSensor from './IDetectionSensor';

interface IFakeSensor extends IDetectionSensor {

  forcePumpEnter(): void;
  forcePumpExit(): void;
}

export default IFakeSensor;