import { Component } from '@angular/core';

/**
 * Generated class for the SampleComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'sample',
  templateUrl: 'sample.html'
})
export class SampleComponent {

  text: string;

  constructor() {
    console.log('Hello SampleComponent Component');
    this.text = 'Hello World';
  }

}
