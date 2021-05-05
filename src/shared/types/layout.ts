import IComponent from './component';

export interface ILayout extends IComponent {

  execute(maxLoops: number): Promise<void>;
}

export default ILayout;
