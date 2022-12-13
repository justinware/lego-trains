import { IApp, ComponentType, IComponentProps } from '../types';
import Component from './component';
import TestLayout from '../layouts/test';

class App extends Component implements IApp {

  constructor(props: IComponentProps) {

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
