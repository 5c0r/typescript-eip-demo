import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { debounceTime, map, flatMap, zip, withLatestFrom, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';
import { combineLatest } from 'rxjs/observable/combineLatest';

@Component({
  selector: 'app-sample2',
  templateUrl: './sample2.component.html',
  styleUrls: ['./sample2.component.css']
})
export class Sample2Component implements OnInit {

  // Source stream
  page$: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  query$: BehaviorSubject<string> = new BehaviorSubject<string>('');
  tags$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  // Intermediate stream
  queryDelay$: Observable<string> = this.query$.pipe(
    debounceTime(1000)
  )
  tagsConvert$: Observable<any> = this.tags$.pipe(
    debounceTime(1000),
    map(x => (x.indexOf(',') > -1 && x.split(',').length > 1) ? `(${x})` : x)
  );

  search$ = combineLatest(
    this.queryDelay$, this.tagsConvert$, this.page$
  )

  searchQuery$ = this.search$.pipe(
    debounceTime(1000),
    switchMap(([query, tags, page]) => {
      return this.httpClient.get(`http://hn.algolia.com/api/v1/search`, {
        params: {
          query: query,
          tags: tags,
          page: page.toString()
        }
      })
    })
  )
  // Presentational stream


  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {
  }

}
