import { Observable } from 'rxjs';
/* import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/filter'; */

import { MyObserver } from './my-observer';

let numbers = [1, 5, 10];
let source = Observable.from(numbers);

source.subscribe(new MyObserver<number>());

source = Observable.create(observer => {
  /*for (let n of numbers.reverse()) {
    observer.next(n);
  }

  observer.complete();*/

  let index = 0;
  let produceValue = () => {
    observer.next(numbers[index++]);

    if (index < numbers.length) {
      setTimeout(produceValue, 250);
    } else {
      observer.complete();
    }
  }

  produceValue();
}).map(n => n * 2)
  .filter(n => n > 4);

source.subscribe(
  value => console.log('Function - value:', value),
  error => console.log('Function - error:', error),
  () => console.log('Function - complete')
);
