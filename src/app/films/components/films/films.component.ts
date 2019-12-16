import { Component, OnInit } from '@angular/core';
import { defer, fromEvent, interval, Observable, of, Subject, timer } from 'rxjs';
import { filter, map, mapTo, pluck, scan, startWith, switchMap, takeUntil, takeWhile, tap } from 'rxjs/operators';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent implements OnInit {

  currentNumber = 0;

  private stopTimers$ = new Subject<any>();

  constructor() {
  }

  ngOnInit() {
    this.initSmartCounter();
  }

  nuevoObservable() {
    const observable = new Observable(subscriber => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      setTimeout(() => {
        subscriber.next(4);
        subscriber.complete();
      }, 1000);
    });

    console.log('antes');
    observable.subscribe(v => console.log(`${v}..`));
    console.log('despues');
  }

  timers() {
    const interval$ = interval(1000).pipe(
      takeUntil(this.stopTimers$)
    );
    const timer$ = timer(1000).pipe(
      takeUntil(this.stopTimers$)
    );
    interval$.subscribe(i => console.log(i));
    timer$.subscribe(done => console.log('ding!!!'));
  }

  stopTimers() {
    this.stopTimers$.next();
  }

  initSmartCounter() {
    const input: any = document.getElementById('range');
    const takeUntilFunc = (endRange, currentNumber) => {
      return endRange > currentNumber
        ? val => val <= endRange
        : val => val >= endRange;
    };
    const positiveOrNegative = (endRange, currentNumber) => {
      return endRange > currentNumber ? 1 : -1;
    };

    // streams
    const enter$ = fromEvent(input, 'keyup').pipe(
      pluck('code'),
      filter(code => code === 'Enter')
    );

    enter$
      .pipe(
        map(() => parseInt(input.value, 10)),
        switchMap(endRange => {
          return timer(0, 50).pipe(
            mapTo(positiveOrNegative(endRange, this.currentNumber)),
            startWith(this.currentNumber),
            scan((acc, curr) => acc + curr),
            takeWhile(takeUntilFunc(endRange, this.currentNumber))
          );
        }),
        tap(v => (this.currentNumber = v)),
        startWith(this.currentNumber)
      )
      .subscribe( val => { this.currentNumber = val; });
  }

  manualMulticasting() {

    // Creates an Observable that, on subscribe, calls an Observable factory to make an Observable for each new Observer.
    const source = defer(() => of(
      Math.floor(Math.random() * 100)
    ));

    function observer(name: string) {
      return {
        next: (value: number) => console.log(`observer ${name}: ${value}`),
        complete: () => console.log(`observer ${name}: complete`)
      };
    }

    const subject = new Subject<number>();
    subject.subscribe(observer('a'));
    subject.subscribe(observer('b'));
    source.subscribe(subject);
  }
}
