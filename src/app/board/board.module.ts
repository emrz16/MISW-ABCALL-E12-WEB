import { NgModule } from '@angular/core';
import { BoardComponent } from './board.component';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    BrowserModule
  ],
  declarations: [BoardComponent]
})
export class BoardModule { }
