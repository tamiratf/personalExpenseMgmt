import { Component, Input, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { ExpenseService } from 'src/data/expense.service';

@Component({
  selector: 'app-total-expense',
  templateUrl: './total-expense.component.html',
  styleUrls: ['./total-expense.component.css']
})
export class TotalExpenseComponent implements OnInit {


  totalAmount: number = 0;
  paidAmount: number = 0;
  unPaidAmount: number = 0;
  
  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.expenseService.getExpensesObservable().subscribe((expenses => {
      this.updateTotals(expenses);
    })); 
  }

  updateTotals(expenses) {
    this.totalAmount = this.paidAmount = this.unPaidAmount = 0;
    _.forEach(expenses, (expense) => {
      this.totalAmount = this.totalAmount + Number(expense.amount);
      if (Number(expense.isPaid))
        this.paidAmount = this.paidAmount + Number(expense.amount);
    });
    this.unPaidAmount = this.totalAmount - this.paidAmount;
  }


}
