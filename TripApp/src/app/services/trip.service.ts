import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {

  private readonly basePath = '/api/Trips/'

  constructor(
    private readonly http: HttpClient
  ) { }


  public get(id: number): Observable<Trip> {
    return this.http.get<Trip>(this.basePath+encodeURIComponent(id));
  }

  public getAll(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.basePath);
  }

  public post(trip: Trip): Observable<Trip> {
    return this.http.post<Trip>(this.basePath, trip);
  }

  public put(trip: Trip): Observable<void> {
    return this.http.put<void>(this.basePath+encodeURIComponent(trip.id), trip);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(this.basePath + encodeURIComponent(id));
  }
}
