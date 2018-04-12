import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { Sample1Component } from './sample1/sample1.component';
import { Sample2Component } from './sample2/sample2.component';

const appRoutes: Routes = [
  { path: 'sample1', component: Sample1Component },
  { path: 'sample2', component: Sample2Component },
  { path: '**', component: Sample1Component }
];

@NgModule({
  declarations: [
    AppComponent,
    Sample1Component,
    Sample2Component
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
