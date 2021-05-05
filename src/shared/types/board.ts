import IComponent from './component';

export interface IBoard extends IComponent {

  initialise(): Promise<void>
}

export default IBoard;
