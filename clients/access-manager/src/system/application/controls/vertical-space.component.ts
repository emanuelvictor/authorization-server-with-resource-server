import {Component, Input} from '@angular/core';
// @ts-ignore
@Component({
    selector: 'vertical-space',
    template: `<div layout="row" [ngStyle]="{'margin': verticalMargin ? verticalMargin + 'px 0' : '10px 0'}"></div>`
})
export class VerticalSpaceComponent {
    @Input() verticalMargin;
}
