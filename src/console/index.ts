import Board from '../shared/core/board'; 
import DetectionSensor from '../shared/core/detectionSensor';
import TrackSwitch from '../shared/core/trackSwitch';
import wait from '../shared/utils/wait';

const main = async (): Promise<void> => {

  const board = new Board();
  await board.initialise();
  
  // const s1 = new DetectionSensor(1, 'A0');

  const ts1 = new TrackSwitch(1, 'A0');
  await ts1.initialise();
  
  const delay:number = 5000;

  for (let i:number = 0; i < 4; i++) {
    
    await wait(delay);
    await ts1.turn();
    await wait(delay);
    await ts1.straight();
  }

  console.log('App: complete');
}

main();