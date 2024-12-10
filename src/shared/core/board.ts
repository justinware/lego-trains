import { Board as JFBoard } from 'johnny-five';

import { ComponentType, type IBoard, type ComponentProps } from '../types';
import ComponentBase from './component';

class Board extends ComponentBase implements IBoard {

  private _board?: JFBoard;

  constructor(props: ComponentProps) {

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
