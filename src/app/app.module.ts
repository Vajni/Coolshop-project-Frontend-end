import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';

@NgModule({
   imports: [ BrowserModule, AppRoutingModule ],
   declarations: [ AppComponent, routingComponents ],
   bootstrap: [ AppComponent ]
 })
export class AppModule { }
