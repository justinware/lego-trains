import { Board as JFBoard } from 'johnny-five';

import { ComponentType, IBoard } from '../types';
import Component from './component';

class Board extends Component implements IBoard {

  private _board: JFBoard = undefined;

  constructor(id: number, isDummy: boolean = false) {

    super(id, ComponentType.Board, isDummy);
  }

  initialise(): Promise<void> {

    return new Promise<void>(resolve => {

      const doResolve = ():void => {

        console.log(`${this._messagePrefix}ready`);
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
