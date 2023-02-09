import { Component } from '@angular/core';
import { FormControlStatus } from '@angular/forms';
import { Router } from '@angular/router';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss']
})
export class AddTripComponent {

  public status?: FormControlStatus;
  private currentTrip?: Trip;

  public constructor(
    private readonly tripService: TripService,
    private readonly router: Router
  ) { }

  onFormValueChanges(value: Trip) {
    this.currentTrip = value;
  }

  onSave() {
    if (this.currentTrip) {
      this.tripService.post(this.currentTrip)
        .subscribe((trip) => this.router.navigate(['/edit-trip', trip.id]));
    }
  }

}
