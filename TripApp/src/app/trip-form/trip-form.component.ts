import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { OnDestroy } from '@angular/core';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControlStatus, NonNullableFormBuilder, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-form',
  templateUrl: './trip-form.component.html',
  styleUrls: ['./trip-form.component.scss']
})
export class TripFormComponent implements OnInit, OnChanges, OnDestroy {

  @Input() public trip?: Trip
  @Output() public changeFormStatus = new EventEmitter<FormControlStatus>();
  @Output() public valueChange = new EventEmitter<Trip>();

  private readonly destroyed = new Subject();

  readonly form = this.fb.group({
    id: this.fb.control(0),
    description: this.fb.control(''),
    from: this.fb.control(''),
    to: this.fb.control(''),
    distance: this.fb.control(0),
  });

  public constructor(
    private readonly fb: NonNullableFormBuilder
  ) {  }


  ngOnInit(): void {
    this.form.controls.id.disable();

    this.form.statusChanges.pipe(
      takeUntil(this.destroyed)
    ).subscribe(state => this.changeFormStatus.emit(state));

    this.form.valueChanges.pipe(
      takeUntil(this.destroyed)
    ).subscribe(() => this.valueChange.emit(this.form.getRawValue()))
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['trip'] && this.trip) {
      console.log(this.trip) // it is a plain value here

      this.form.patchValue(this.trip)
    }
  }

  ngOnDestroy(): void {
    this.destroyed.next(true);
    this.destroyed.complete();
  }


}
