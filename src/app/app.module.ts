import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { CustomerFormComponent } from './customer-form/customer-form.component';

import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AddressAutocompleteComponent } from './address-autocomplete/address-autocomplete.component';
import { CustomersListComponent } from './customers-list/customers-list.component';
import { agmApiKey } from '../credentials';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    CustomerFormComponent,
    AddressAutocompleteComponent,
    CustomersListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      libraries: ['places'],
      apiKey: 'YOUR_GOOGLE_API_KEY'
    })
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
