import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  public employees:any[] = [];
  //public dataURL = 'https://api.sl.se/api2/realtimedeparturesV4.json?key=c3fa612773d9439699d02d0d069549ce&SiteID=1555&timewindow=60';
  //public dataURL = 'https://api.myjson.com/bins/rnsi8'
  public dataURL = 'https://api.covid19api.com/summary'

  constructor(private _httpClient:HttpClient){}

  public getAllEmployees():Observable<any>{
    return this._httpClient.get(this.dataURL).pipe(
      retry(2),
      catchError(this.errorHandler)
    );
    
  }

  public errorHandler(error:HttpErrorResponse){
    let errorMessage = '';
    if(error.error instanceof ErrorEvent){
      // Client side Error
      errorMessage = `Error : ${error.error.message}`;
    }
    else{
      // Server Side Error
      errorMessage = `ERROR : ${error.status} : Message : ${error.message}`;
    }
    return throwError(errorMessage);
  }


}
