import { empty } from 'rxjs';
import { delay } from 'rxjs/operators';

export default (millisecs: number): Promise<unknown> => {

  return empty()
          .pipe(delay(millisecs))
          .toPromise();
};