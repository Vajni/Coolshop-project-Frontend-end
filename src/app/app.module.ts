import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule, routingComponents } from './app.routing';
import { HttpModule } from '@angular/http';

@NgModule({
   imports: [ BrowserModule, AppRoutingModule, HttpModule ],
   declarations: [ AppComponent, routingComponents ],
   bootstrap: [ AppComponent ]
 })
export class AppModule { }
