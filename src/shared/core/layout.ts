import { ComponentType } from '../types/enums';
import Component from './component';
import ILayout from '../types/ILayout';
import { TEXT_STRINGS } from './constants';

abstract class Layout extends Component implements ILayout {

  private _loopCount: number = 0;

  constructor(id: number, isDummy: boolean = false) {

    super(id, ComponentType.Layout, isDummy);
  }

  protected abstract executeStart(): Promise<void>;
  protected abstract executeLoop(): Promise<void>;
  protected abstract executeEnd(): Promise<void>;

  async execute(maxLoops: number): Promise<void> {

    this.log(`${TEXT_STRINGS.EXECUTING} start`);
    await this.executeStart();

    this.log(`${TEXT_STRINGS.EXECUTING} loops`);
    while (this._loopCount < maxLoops) {

      this._loopCount++;
      this.log(`${TEXT_STRINGS.EXECUTING} loop ${this._loopCount}`);
      await this.executeLoop();
    }

    this.log(`${TEXT_STRINGS.EXECUTING} end`);
    await this.executeEnd();

    this.log(TEXT_STRINGS.COMPLETE);
  }
}

export default Layout;
