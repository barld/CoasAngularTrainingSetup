import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { MatTabsModule } from '@angular/material/tabs';

import { AppRoutingModule } from './app-routing.module';
import { OverviewComponent } from './overview/overview.component';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AddTripComponent } from './add-trip/add-trip.component';
import { EditTripComponent } from './edit-trip/edit-trip.component';
import { TripFormComponent } from './trip-form/trip-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SubmitButtonComponent } from './submit-button/submit-button.component';


@NgModule({
  declarations: [
    AppComponent,
    OverviewComponent,
    AddTripComponent,
    EditTripComponent,
    TripFormComponent,
    SubmitButtonComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MatTabsModule,
    BrowserAnimationsModule,

    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
