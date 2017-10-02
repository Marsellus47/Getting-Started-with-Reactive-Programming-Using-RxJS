import { Observable } from 'rxjs';

let circle = document.getElementById('circle');
let source = Observable.fromEvent(document, 'mousemove')
  .map((e: MouseEvent) => {
    return {
      x: e.clientX,
      y: e.clientY
    }
  })
  .filter(value => value.x < 150)
  .delay(300);

function onNext(value) {
  circle.style.left = value.x;
  circle.style.top = value.y;
}

source.subscribe(
  onNext,
  error => console.log('error:', error),
  () => console.log('complete')
);
