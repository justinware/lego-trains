import IComponent from './IComponent';

interface IAction extends IComponent {

  order: number;
  execute(): Promise<void>
}

export default IAction;