import { Board } from 'johnny-five';
import { SensorSource } from '../shared/core/sensorStream';

// --- Main application logic ---
console.log('Connecting to Arduino board...');

const board = new Board({});

board.on('ready', () => {
  console.log('Board connected and ready!');

  const sensorData$ = new SensorSource('A0').stream;

  // Subscribe to the stream to start receiving data
  const subscription = sensorData$.subscribe(
    (value: number) => {
      console.log(`Sensor Reading: ${value}`);
    },
    (error) => {
      console.error('Error in sensor stream:', error);
    },
    () => {
      console.log('Sensor stream completed.');
    }
  );

  board.on('exit', () => {
    console.log('Board exiting. Unsubscribing from sensor data.');
    subscription.unsubscribe();
  });
});

board.on('fail', (event) => {
  console.error('Board connection failed:', event);
  process.exit(1);
});
