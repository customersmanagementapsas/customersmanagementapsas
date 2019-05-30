import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

import * as uuid from 'uuid';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent implements OnInit {

  form: FormGroup;
  addressForm: FormGroup;

  autocomplete;
  id;

  constructor(
    private fb: FormBuilder,
    private cd: ChangeDetectorRef,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      full_name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
    });
    this.addressForm = this.fb.group({
      locality: new FormControl('', Validators.required),
      route: new FormControl('', Validators.required),
      street_number: new FormControl('', Validators.required),
      postal_code: new FormControl('', Validators.required)
    });

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      if (this.id) {
        const customers = localStorage.getItem('customers');
        const customer = JSON.parse(customers)[this.id]
        const { email, full_name } = customer;
        const { locality, route, street_number, postal_code } = customer;

        this.form.setValue({email, full_name});
        this.addressForm.setValue({locality, route, street_number, postal_code});
      } else {
        this.id = uuid();
      }
    });

  }

  placeSelected(addressComponents) {
    this.addressForm.reset();

    addressComponents.forEach(addrComp => {
      const ctrlName = addrComp.types[0];
      if (addrComp && this.addressForm.get(ctrlName)) {
        this.addressForm.get(ctrlName).setValue(addrComp.long_name);
      }
    });

    for (const i in this.addressForm.controls) {
      if (i) {
        this.addressForm.controls[i].markAsTouched();
      }
    }

    this.cd.detectChanges();
  }

  submitForm() {
    const formValue = this.form.value;
    const addressFormValue = this.addressForm.value;
    const customer = { ...formValue, ...addressFormValue};

    const customers = localStorage.getItem('customers');
    const customersObj = customers ? JSON.parse(customers) : {};

    customersObj[this.id] = customer;
    localStorage.setItem('customers', JSON.stringify(customersObj));

    this.router.navigateByUrl('customers-list')
  }

  showError(group: FormGroup, controlName: string) {
    return group.get(controlName).invalid && group.get(controlName).touched;
  }
}
