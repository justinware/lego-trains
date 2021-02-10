// import motorTest from './motorTest';
//import XmasLayout from '../shared/layouts/xmas';

// const maxLoops: number = 3;
// const isDummy: boolean = false;

// import DummyLayout from '../shared/core/layout';
import Board from '../shared/core/board';
import TestLayout from '../shared/layouts/test';

const main = async () => {

  // const board = new Board(1, true);
  // await board.initialise();
  const layout = new TestLayout(1);
  await layout.execute(5);

  console.log('App: complete');
}

main();
