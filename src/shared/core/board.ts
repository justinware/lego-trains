import { Board as JFBoard } from 'johnny-five';

import { ComponentType, IBoard, IComponentProps } from '../types';
import Component from './component';

class Board extends Component implements IBoard {

  private _board: JFBoard = undefined;

  constructor(props: IComponentProps) {

    super(props, ComponentType.Board);
  }

  initialise(): Promise<void> {

    return new Promise<void>(resolve => {

      const doResolve = ():void => {

        this.log('ready');
        resolve();
      };

      if (this._isDummy) {

        doResolve();
      } else {

        this._board = new JFBoard({ repl: false });
        this._board.on('ready', doResolve);
      }
    });
  }
}

export default Board;
