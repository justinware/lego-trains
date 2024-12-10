import { type IApp, ComponentType, type ComponentProps } from '../types';
import ComponentBase from './component';
import TestLayout from '../layouts/test';

class App extends ComponentBase implements IApp {

  constructor(props: ComponentProps) {

    super(props, ComponentType.App);
  }

  async run(): Promise<void> {

    this.log('starting');

    const layout = new TestLayout({ id: 1, isDummy: this._isDummy, name: 'Xmas Layout' });
    await layout.execute(3);

    this.log('complete');
  }
}

export default App;
