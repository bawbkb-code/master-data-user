import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "src/environments/environment.dev";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  private unsubscribe$ = new Subject();
  constructor(private http: HttpClient) { }

  get endpoint(): string {
    return environment.endpoint.api;
  }

  post(url: string, model: any): any {
    let headers: any = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.post(environment.endpoint.api + url, model, { headers: headers });
  }

  get(url: string): any {
    let headers: any = new HttpHeaders();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");
    return this.http.get(environment.endpoint.api + url, { headers: headers });
  }

  ngOnDestroy() {
    this.unsubscribe$.complete();
  }
}
