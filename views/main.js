import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rxjs/Rx';

const root = document.getElementById("root");
const button = document.getElementById("button");

const load = (url) => Rx.Observable.create(observer => {
  const xhr = new XMLHttpRequest();

  xhr.addEventListener("load", () => {
    if (xhr.status === 200) {
      const data = JSON.parse(xhr.responseText);
      observer.next(data);
      observer.complete();
    } else {
      observer.error()
    }
  });

  xhr.open("GET", url);
  xhr.send();
}).retryWhen(exponentialBackoff(3, 1000));

const backoffStrategy = (maxRetries, delayFunction) =>
  attempts => attempts
    .zip(Rx.Observable.range(1, maxRetries), (a, idx) => idx)
    .delayWhen(idx => Rx.Observable.timer(delayFunction(idx)));

const exponentialBackoff = (maxRetries, period) =>
  backoffStrategy(maxRetries, idx => idx * idx * period);

const incrementalBackoff = (maxRetries, period) =>
  backoffStrategy(maxRetries, idx => idx * period);

const clicks = Rx.Observable.fromEvent(button, 'click');

clicks.first().flatMap(c => load("dataa.json")).subscribe(
  data => console.log(data),
  error => console.log(error),
  () => console.log("Completed")
);
