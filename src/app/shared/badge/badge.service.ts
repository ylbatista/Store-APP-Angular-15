import { Injectable } from '@angular/core';

import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BadgeService {

  private counter: number = 0;
  private counterSubject = new Subject<number>();

  constructor() { }

  incrementCounter(){
    this.counter++;
    this.counterSubject.next(this.counter);
  }

  decrementCounter(): void {
    if (this.counter > 0) {
      this.counter--;
      this.counterSubject.next(this.counter);
    }
  }

  getCounter(): Observable <number> {
    return this.counterSubject.asObservable();
  }

  clearBadgeNotify(): void {
    this.counterSubject.next(0);
    this.counter = 0;
  }

}
