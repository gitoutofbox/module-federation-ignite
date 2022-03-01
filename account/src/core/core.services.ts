import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountServices {
  constructor(private http: HttpClient) {}

  getData(url: string, headers?: any): Observable<any> {
    return this.http.get(url, headers).pipe(map((response) => response));
  }
}
