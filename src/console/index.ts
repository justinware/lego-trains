import Board from '../shared/core/board'; 

const main = async (): Promise<void> => {

  const board = new Board();
  await board.initialise();
  
  console.log('ready...');
}

main();