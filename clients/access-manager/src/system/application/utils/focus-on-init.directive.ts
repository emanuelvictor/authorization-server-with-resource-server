import {AfterViewInit, Directive, ElementRef, Input, OnInit, Renderer} from '@angular/core';

@Directive({
  selector: '[focusOnInit]'
})
export class FocusOnInitDirective implements OnInit, AfterViewInit {
  @Input('focusOnInit') priority: number = 0;

  static instances: FocusOnInitDirective[] = [];

  constructor(public renderer: Renderer, public elementRef: ElementRef) {
  }

  ngOnInit(): void {
    //FocusOnInitDirective.instances.push(this)
  }

  ngAfterViewInit(): void {

   /* setTimeout(() => {
      FocusOnInitDirective.instances.splice(FocusOnInitDirective.instances.indexOf(this), 1);
    },100);*/

    //if (FocusOnInitDirective.instances.every((i) => this.priority >= i.priority)) {
      //o setTimeout é necessário pois precisa dar tempo do evento focus do material ser executado PRIMEIRO
      setTimeout(() => {this.renderer.invokeElementMethod(
        this.elementRef.nativeElement, 'focus', []);},3);
        setTimeout(() => {this.renderer.invokeElementMethod(
          this.elementRef.nativeElement, 'focus', []);},8);
    //}
  }
}
