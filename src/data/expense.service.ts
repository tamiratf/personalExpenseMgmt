import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { __assign } from 'tslib';
import { ExpenseModel} from './expense.model';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private REST_API_SERVER = "http://localhost:3000/expenses";

  constructor(private httpClient: HttpClient) { }

  getAllExpenses(): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER).pipe(
      map(expenses => {
        _.forEach(expenses, (expense) => {
          expense['amount'] = _.parseInt(expense['amount']);
        });
        return expenses;
      })
    );
  };

  postNewExpense(expense) {
    return this.httpClient.post(this.REST_API_SERVER, expense);
  };

  updateExpense(expense) {
    return this.httpClient.put(this.REST_API_SERVER + '/' + expense.id, expense);
  };

  removeExpense(id) {
    return this.httpClient.delete(this.REST_API_SERVER + '/' + id);
  }
}
