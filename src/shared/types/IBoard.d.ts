import IComponent from './IComponent';

interface IBoard extends IComponent {

  initialise(): Promise<void>
}

export default IBoard;