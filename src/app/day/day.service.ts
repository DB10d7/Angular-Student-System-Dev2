import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DayService {

  constructor(private httpClient: HttpClient) { }
  getDayList(): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/days/'));
    return this.httpClient.get<any>('http://localhost:8080/api/days/');
  }
  getDayListByBatch(name: String): Observable<any>{
    console.log(this.httpClient.get('http://localhost:8080/api/days/by-batch/'+ name));
    return this.httpClient.get<any>('http://localhost:8080/api/days/by-batch'+ name);
  }
}
