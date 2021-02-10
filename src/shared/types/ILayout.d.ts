interface ILayout {

  execute(maxLoops: number): Promise<void>;
}

export default ILayout;
