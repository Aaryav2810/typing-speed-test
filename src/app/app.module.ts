import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ScoreboardComponent } from './scoreboard/scoreboard.component';
import { ParagraphComponent } from './paragraph/paragraph.component';
import { TextfieldComponent } from './textfield/textfield.component';

@NgModule({
  declarations: [
    AppComponent,
    ScoreboardComponent,
    ParagraphComponent,
    TextfieldComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
