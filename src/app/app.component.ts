import { Component, OnInit } from '@angular/core';
import { ExpenseService } from './../../src/data/expense.service';
import * as _ from 'lodash';

import { map } from 'rxjs/operators';
import { ExpenseModel } from './../data/expense.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ExpenseMgmt';

  expenses: ExpenseModel[] = [];
  newExpense: any = {};
  invalidForm: boolean = false;
  totalAmount: number = 0;
  paidAmount: number = 0;
  unPaidAmount: number = 0;

  constructor(private expenseService: ExpenseService) { }

  ngOnInit() {
    this.getAllExpenses();
  }

  getTotalAmount() {
    let total = 0;
    _.forEach(this.expenses, (expense: ExpenseModel) => {
      total = total + Number(expense.amount);
    });
    return total;
  }
  getPaidAmount() {
    let total = 0;
    _.forEach(this.expenses, (expense: ExpenseModel) => {
      if (Number(expense.isPaid))
        total = total + Number(expense.amount);
    });
    return total;
  }

  getAllExpenses() {
    return this.expenseService.getAllExpenses().subscribe((expenses) => {
      this.expenses = expenses;
      this.totalAmount = this.getTotalAmount();
      this.paidAmount = this.getPaidAmount();
      this.unPaidAmount = this.totalAmount - this.paidAmount;
    });
  }

  addNewExpense(newExpense) {
    if (newExpense.title && newExpense.amount) {
      this.invalidForm = false;
      this.expenseService.postNewExpense(newExpense).subscribe(() => {
        this.getAllExpenses();
      });

      this.newExpense = {};
    }
    else {
      this.invalidForm = true;
    }
  }

  removeExpense(id) {
    this.expenseService.removeExpense(id).subscribe();
    this.expenses = _.filter(this.expenses, (expense) => {
      return expense.id !== id;
    });
  }

  updateExpense(expense) {
    expense.isPaid = (expense.isPaid) ? 0 : 1;
    this.expenseService.updateExpense(expense).subscribe();
    this.getAllExpenses();
  }
}
