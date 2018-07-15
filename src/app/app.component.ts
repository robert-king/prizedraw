import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public boost = false;
  public stack = false;
  public entryCount = 1000;
  public prizeCount = 100;
  public days = 30;
}
