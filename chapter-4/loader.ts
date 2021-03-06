import { Observable } from 'rxjs';

export function load(url: string) {
  return Observable.create(observer => {
    let xhr = new XMLHttpRequest();

    const onLoad = () => {
      if (xhr.status >= 200 && xhr.status < 400) {
        let data = JSON.parse(xhr.responseText);
        observer.next(data);
        observer.complete();
      } else {
        observer.error(xhr.statusText);
      }
    }

    xhr.addEventListener('load', onLoad);

    xhr.open('GET', url);
    xhr.send();

    return () => {
      console.log('cleanup');
      xhr.removeEventListener('load', onLoad);
      xhr.abort();
    }
  }).retryWhen(retryStrategy({ attempts: 3, delay: 1500 }));
}

export function loadWithFetch(url: string) {
  return Observable.defer(() => Observable.fromPromise(fetch(url)
    .then(response => {
      if (response.status === 200) {
        return response.json();
      } else {
        return Promise.reject(response);
      }
    }))
  ).retryWhen(retryStrategy());
}

function retryStrategy({ attempts = 5, delay = 1000 } = {}) {
  return function (errors) {
    return errors
      .scan((acc, value) => {
        acc += 1;
        if (acc <= attempts) {
          return acc;
        } else {
          throw new Error(value);
        }
      }, 1)
      .delay(delay);
  }
}
