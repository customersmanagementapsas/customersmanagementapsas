import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

@Component({
  selector: 'address-autocomplete',
  templateUrl: './address-autocomplete.component.html',
  styleUrls: ['./address-autocomplete.component.scss']
})
export class AddressAutocompleteComponent implements AfterViewInit {

  @ViewChild('addressInput') addressInput: ElementRef;
  @ViewChild('infowindowContent') infowindowContent: ElementRef;

  @Output() placeSelected = new EventEmitter();

  autocomplete;

  constructor(
    private mapsAPILoader: MapsAPILoader,
  ) { }

  ngAfterViewInit() {
    this.mapsAPILoader.load().then(() => {
      this.autocomplete = new google.maps.places.Autocomplete(this.addressInput.nativeElement);
      this.autocomplete.setComponentRestrictions({country: ['lt']});
      this.autocomplete.setFields(['address_components']);
      const infowindow = new google.maps.InfoWindow();
      infowindow.setContent(this.infowindowContent.nativeElement);

      this.autocomplete.addListener('place_changed', () => {
        infowindow.close();
        const place = this.autocomplete.getPlace();

        if (!place.address_components) {
          window.alert('Address: ' + place.name + ' not found');
          return;
        }
        this.placeSelected.emit(place.address_components);

      });
    });

  }

}
