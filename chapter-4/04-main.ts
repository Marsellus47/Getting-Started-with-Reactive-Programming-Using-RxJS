import { Observable } from 'rxjs';

import { load, loadWithFetch } from './loader';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function renderMovies(movies) {
  movies.forEach(m => {
    let div = document.createElement('div');
    div.innerText = m.title;
    output.appendChild(div);
  });
}

loadWithFetch('04-moviesX.json').subscribe(
  renderMovies,
  error => console.log(`error: ${error}`),
  () => console.log('complete!')
);

click.flatMap(e => loadWithFetch('03-movies.json'))
  .subscribe(
    renderMovies,
    error => console.log('error:', error),
    () => console.log('complete')
  );
