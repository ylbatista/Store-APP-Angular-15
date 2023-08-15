import { Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/app/environment/environment';
import { DataTable, Lista } from 'src/app/interfaces/data-table';

@Injectable({
  providedIn: 'root'
})
export class MonthSalesService {

  private api_url = environment.API_URL;

  constructor(
    private http: HttpClient,
  ) { }

  getTableData(): Observable<any>{
    return this.http.get<DataTable[]>(`${this.api_url}/orden/tabla`)
  }

}
