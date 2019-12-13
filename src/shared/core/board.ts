import { Board as JFBoard } from 'johnny-five';

import IBoard from '../types/IBoard';

class Board implements IBoard {
  
  private _board: JFBoard = undefined;

  initialise(): Promise<void> {
    
    return new Promise<void>(resolve => {

      this._board = new JFBoard({ repl: false });
      this._board.on('ready', () => {

        console.log('Board: ready');
        resolve();
      });
    });
  }
}

export default Board;