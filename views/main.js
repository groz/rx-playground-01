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
}).retryWhen(retryStrategy(3, 1000));

const retryStrategy = (maxRetries, delay) =>
  (errors) => errors
    .delay(Rx.Observable.of(100, 1000, 3000));

const clicks = Rx.Observable.fromEvent(button, 'click');

clicks.first().flatMap(c => load("dataa.json")).subscribe(
  data => console.log(data),
  error => console.log(error),
  () => console.log("Completed")
);

console.log("ok");

const f = x => 1;

var src = Rx.Observable.from([1,2,3]);

src.delay(
    //Rx.Observable.from([100,200,300])
  f
).subscribe(x => console.log(x));