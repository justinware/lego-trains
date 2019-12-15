import IComponent from './IComponent';

interface ITrain extends IComponent {

  forward(speed: number): void;
  reverse(speed: number): void;
  stop(): void;
}

export default ITrain;