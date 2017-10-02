import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    xhr.addEventListener('load', () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    });

    xhr.open('GET', url);
    xhr.send();
  }).retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
}

function retryStrategy({ attempts = 5, delay = 1000 }) {
  return function(errors) {
    return errors
      .scan((acc, value) => {
        console.log(acc, value);
        return acc + 1;
      }, 1)
      .takeWhile(acc => acc <= attempts)
      .delay(delay);
  }
}

function renderMovies(movies) {
  movies.forEach(m => {
    let div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

click.flatMap(e => load('03-movies.json'))
  .subscribe(
    renderMovies,
    error => console.log('error:', error),
    () => console.log('complete')
  );
