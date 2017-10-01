import { Observer } from 'rxjs';

export class MyObserver<T> implements Observer<T> {
  next(value) {
    console.log('MyObserver - value:', value);
  }

  error(error) {
    console.log('MyObserver - error:', error);
  }

  complete() {
    console.log('MyObserver - complete');
  }
}
