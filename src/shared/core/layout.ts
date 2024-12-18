import { type ILayout, ComponentType, type ComponentProps } from '../types';
import ComponentBase from './component';
import { TEXT_STRINGS } from './constants';

abstract class Layout extends ComponentBase implements ILayout {

  private _loopCount = 0;

  constructor(props: ComponentProps) {

    super(props, ComponentType.Layout);
  }

  protected abstract initialise(): Promise<void>;
  protected abstract executeStart(): Promise<void>;
  protected abstract executeLoop(): Promise<void>;
  protected abstract executeEnd(): Promise<void>;
  protected abstract finalise(): Promise<void>;

  async execute(maxLoops: number): Promise<void> {

    // TODO: Should initialise() be called here (inside execute) or separately / externally ??
    //       Not sure on this, as might not be a concern of the execute.
    //       e.g. Might want to initialise just once up front, then execute multiple times
    this.log(TEXT_STRINGS.INITIALISING);
    await this.initialise();

    this.log(`${TEXT_STRINGS.EXECUTING} START`);
    await this.executeStart();

    this.log(`${TEXT_STRINGS.EXECUTING} LOOPS`);
    while (this._loopCount < maxLoops) {

      this._loopCount++;
      this.log(`${TEXT_STRINGS.EXECUTING} loop ${this._loopCount}`);
      await this.executeLoop();
    }

    this.log(`${TEXT_STRINGS.EXECUTING} END`);
    await this.executeEnd();

    this.log(TEXT_STRINGS.FINALISING);
    await this.finalise();

    this.log(TEXT_STRINGS.COMPLETE);
  }
}

export default Layout;
