interface ITrain {

  forward(speed: number): void;
  reverse(speed: number): void;
  stop(): void;
}

export default ITrain;