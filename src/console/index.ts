import TestLayout from '../shared/layouts/test';
import { MAX_PREFIX_LENGTH } from '../shared/core/constants';

const main = async () => {

  const layout = new TestLayout({ id: 1, isDummy: true, name: 'Xmas Layout' });
  await layout.execute(5);

  console.log(`${'App'.padEnd(MAX_PREFIX_LENGTH)} : complete`);
}

main();
