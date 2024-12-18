import { empty } from 'rxjs';
import { delay } from 'rxjs/operators';

export default (millisecs: number): Promise<unknown> => new Promise(resolve => {

  setTimeout(resolve, millisecs);
});
