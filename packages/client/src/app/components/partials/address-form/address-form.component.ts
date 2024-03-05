import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {
  addressForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.addressForm = this.fb.group({
      streetName: ['', Validators.required],
      city: ['', Validators.required],
      number: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  onSubmit() {
    // Handle form submission
    console.log(this.addressForm.value);
  }
}
