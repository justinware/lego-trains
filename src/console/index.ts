import App from '../shared/core/app';

const main = async () => {

  const app = new App({ id: 1, isDummy: false, name: 'Main App' });
  await app.run();
}

main();
