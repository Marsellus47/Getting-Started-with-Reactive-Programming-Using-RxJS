import { Observable } from 'rxjs';

let output = document.getElementById('output');
let button = document.getElementById('button');

let click = Observable.fromEvent(button, 'click');

function load(url: string) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener('load', () => {
    let movies = JSON.parse(xhr.responseText);
    movies.forEach(m => {
      let div = document.createElement('div');
      div.innerText = m.title;
      output.appendChild(div);
    });
  });

  xhr.open('GET', url);
  xhr.send();
}

click.subscribe(
  e => load('03-movies.json'),
  error => console.log('error:', error),
  () => console.log('complete')
);
