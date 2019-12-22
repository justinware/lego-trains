import IAction from './IAction';

interface ISequence {

  start: Array<IAction>;
  loop: Array<IAction>;
  end: Array<IAction>;
}

export default ISequence;