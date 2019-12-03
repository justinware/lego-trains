import * as five from 'johnny-five';

import IBoard from '../types/IBoard';

class Board implements IBoard {
  
  private _jfBoard: five.Board = undefined;

  initialise(): Promise<void> {
    
    return new Promise<void>(resolve => {

      this._jfBoard = new five.Board({ repl: false });
      this._jfBoard.on('ready', resolve);
    });
  }
}

export default Board;