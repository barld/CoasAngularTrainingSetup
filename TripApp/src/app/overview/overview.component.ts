import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, EMPTY, Observable, switchMap } from 'rxjs';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  private readonly refresh = new BehaviorSubject(true);
  trips: Observable<Trip[]> = EMPTY;

  public constructor(
    private readonly tripService: TripService,
  ) { }

  ngOnInit() {
    this.trips = this.refresh.pipe(
      switchMap(() => this.tripService.getAll())
    );
  }

  onRefresh() {
    this.refresh.next(true);
  }

  onDelete(id: number) {
    this.tripService.delete(id).subscribe(() => this.refresh.next(true));
  }
}
