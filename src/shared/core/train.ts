import { ComponentType } from '../types/enums';
import ComponentBase from './componentBase';
import ITrain from '../types/ITrain';

class Train extends ComponentBase implements ITrain {

  constructor(id: number) {

    super(id, ComponentType.Train);

    // Hook up JF motor
  }

  forward(speed: number): void {
   

  }
  
  reverse(speed: number): void {
    

  }
  
  stop(): void {
  
  }
}

export default Train;