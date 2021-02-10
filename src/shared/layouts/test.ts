import Layout from '../core/layout';
import wait from '../utils/wait';

class TestLayout extends Layout {

  protected async executeStart(): Promise<void> {

    // Move Train forward slowly until Sensor 2 pumps Exit, then resolve
  }

  protected async executeLoop(): Promise<void> {

    // Move Train forward at medium speed, when Sensor 2 pumps Exit, then resolve
  }

  protected async executeEnd(): Promise<void> {

    // Move Train backwards slowly until Sensor 1 pumps Exit, then stop the train, then resolve
  }
}

export default TestLayout;
