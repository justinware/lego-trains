import { Subject } from 'rxjs';

export default abstract class StreamSource<TData> {
  private _stream: Subject<TData>;

  constructor() {
    this._stream = new Subject<TData>();
  }

  protected push(data: TData) {
    this._stream.next(data);
  }

  protected get stream() {
    return this._stream.asObservable();
  }
}
