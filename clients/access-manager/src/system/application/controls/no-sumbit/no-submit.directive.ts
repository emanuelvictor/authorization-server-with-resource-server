import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[noSubmit]'
})
export class NoSubmitDirective {

  @Input() keyCode: number = 13;

  constructor() {
  }

  /**
   *
   * @param event
   */
  @HostListener('keypress', ['$event'])
  onClick(event) {
    if (event.keyCode === this.keyCode) {
      event.preventDefault()
    }
  }

}
