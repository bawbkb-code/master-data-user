import { Injectable, OnDestroy } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class SearchService implements OnDestroy {
  protected _config = new BehaviorSubject<any>(null);
  protected _result = new BehaviorSubject<any>(null);
  protected _filter = new BehaviorSubject<any>(null);
  protected _searchTrigger = new BehaviorSubject<any>(null);

  get config(): Observable<any> {
    return this._config.asObservable();
  }

  get searchTrigger(): Observable<any> {
    return this._searchTrigger.asObservable();
  }

  get result(): Observable<any> {
    return this._result.asObservable();
  }

  get filter(): Observable<any> {
    return this._filter.asObservable();
  }

  set setResult(v: any) {
    this._result.next(v);
  }

  set setFilter(v: any) {
    this._filter.next(v);
  }

  set setConfig(v: any) {
    this._config.next(v);
  }

  search(): void {
    this._searchTrigger.next(null);
  }

  constructor() { }

  ngOnDestroy(): void {
    this._config.complete();
    this._result.complete();
    this._filter.complete();
    this._searchTrigger.complete();
  }

  reset(): void {
    this._config.next(null);
    this._result.next(null);
    this._filter.next(null);
    this._searchTrigger.next(null);
  }

  
}
