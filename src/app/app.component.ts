import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  buttonOne: boolean = true;
  buttonTwo: boolean = false;

  constructor(private store: Store<{ tooltip: number }>) {
    // Listening to store state value
    store.pipe(select('tooltip')).subscribe((data: any) => {
      if (data.tooltipId == 1) {
        this.buttonOne = true;
        this.buttonTwo = false;
      } else if (data.tooltipId == 2) {
        this.buttonOne = false;
        this.buttonTwo = true;
      } else {
        this.buttonOne = false;
        this.buttonTwo = false;
      }
    });
  }
}
