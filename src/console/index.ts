import motorTest from './motorTest';
//import XmasLayout from '../shared/layouts/xmas';

const maxLoops: number = 3;
const isDummy: boolean = false;

const main = async () => {

  //const layout = new XmasLayout(maxLoops, isDummy);
  await motorTest(isDummy);

  console.log('App: complete');
}

main();