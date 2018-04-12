import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { debounceTime, map, switchMap, withLatestFrom } from 'rxjs/operators';

@Component({
  selector: 'app-sample1',
  templateUrl: './sample1.component.html',
  styleUrls: ['./sample1.component.css']
})
export class Sample1Component implements OnInit {

  inputObs$: Subject<string> = new Subject<string>();

  inputObsDelay$ = this.inputObs$.pipe(
    debounceTime(2000)
  )

  inputObsMap$ = this.inputObs$.pipe(
    map(x => x.toUpperCase())
  )

  constructor() { }

  ngOnInit() {

  }

  public onInputChange($ev: any): void {
    this.inputObs$.next($ev.target.value);
  }

}
