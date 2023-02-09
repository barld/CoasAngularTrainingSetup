import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit {
  trip$: Observable<Trip | undefined> = EMPTY;
  latestTrip?: Trip;
  next$: Observable<number> = EMPTY;
  prev$: Observable<number> = EMPTY;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tripService: TripService
  ) { }

  ngOnInit(): void {
    this.trip$ = this.route.params.pipe(
      switchMap(params => this.tripService.get(+params['id']).pipe(catchError(() => of(undefined)))),
      shareReplay()
    );

    this.trip$.subscribe(
      trip => this.latestTrip = trip
    );

    const id$ = this.route.params.pipe(
      map(params => +params['id'])
    );

    this.prev$ = id$.pipe(
      map(id => id - 1),
      tap(console.log)
    );

    this.next$ = id$.pipe(
      map(id => id + 1)
    );
  }

  onUpdate() {
    if (this.latestTrip) {
      this.tripService.put(this.latestTrip).subscribe();
    }
  }

  onUpdateTrip(trip: Trip) {
    this.latestTrip = trip;
  }
}
