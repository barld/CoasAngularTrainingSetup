import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, shareReplay, Subject, Subscription, switchMap, takeUntil, tap } from 'rxjs';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.scss']
})
export class EditTripComponent implements OnInit, OnDestroy {
  trip$: Observable<Trip | undefined> = EMPTY;
  latestTrip?: Trip;
  next$: Observable<number> = EMPTY;
  prev$: Observable<number> = EMPTY;
  tripsSubscription?: Subscription;
  destroyed = new Subject();

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tripService: TripService
  ) { }

  ngOnInit(): void {
    this.trip$ = this.route.params.pipe(
      takeUntil(this.destroyed),
      switchMap(params => this.tripService.get(+params['id']).pipe(catchError(() => of(undefined)))),
      shareReplay()
    );

    this.tripsSubscription = this.trip$.pipe(
      takeUntil(this.destroyed),
    ).subscribe(
      trip => this.latestTrip = trip
    );

    const id$ = this.route.params.pipe(
      takeUntil(this.destroyed),
      map(params => +params['id'])
    );

    this.prev$ = id$.pipe(
      map(id => id - 1)
    );

    this.next$ = id$.pipe(
      map(id => id + 1)
    );
  }

  ngOnDestroy(): void {
    this.tripsSubscription?.unsubscribe();
    this.destroyed.next(true);
    this.destroyed.complete();
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
