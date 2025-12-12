export default (millisecs: number): Promise<unknown> =>
  new Promise((resolve) => {
    setTimeout(resolve, millisecs);
  });
