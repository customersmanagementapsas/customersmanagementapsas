import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {

  customers;

  constructor() { }

  ngOnInit() {
    this.customers = JSON.parse(localStorage.getItem('customers'));
  }

}
