import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';

import { map } from 'rxjs/operators';
import { ExpenseModel } from './../../data/expense.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from './../../../src/data/expense.service';

@Component({
  selector: 'app-expense',
  templateUrl: './expense.component.html',
  styleUrls: ['./expense.component.css']
})
export class ExpenseComponent implements OnInit {

  title = 'ExpenseMgmt';
  expenseForm: FormGroup;

  expenses: ExpenseModel[] = [];
  newExpense: any = {};
  invalidForm: boolean = false;
  totalAmount: number = 0;
  paidAmount: number = 0;
  unPaidAmount: number = 0;

  constructor(private expenseService: ExpenseService, private fb: FormBuilder) { }

  ngOnInit() {
    this.expenseForm = this.fb.group({
      title: ['', Validators.required],
      amount: ['', Validators.required],
      detail: this.fb.group({
        id: [''],
        name: ['']
      })
    });
    this.getAllExpenses();
  }

  getAllExpenses() {
    return this.expenseService.getAllExpenses().subscribe((expenses) => {
      this.expenses = expenses;
      this.expenseService.setExpensesObservable(this.expenses);
    });
  }

  addNewExpense() {
    if (!this.expenseForm.valid) {
      this.invalidForm = true;
      return false;
    }

    this.invalidForm = false;
    this.expenseService.postNewExpense(this.expenseForm.value).subscribe(() => {
      this.getAllExpenses();
    });

    this.newExpense = {};
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
