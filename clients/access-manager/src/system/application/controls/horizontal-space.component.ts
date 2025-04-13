import {Component, Input} from '@angular/core';

// @ts-ignore
@Component({
    selector: 'horizontal-space',
    template: `<div [ngStyle]="{'margin': horizontalMargin ? '0 '+ horizontalMargin +'px' : '0 10px'}"></div>`
})
export class HorizontalSpaceComponent {
    @Input() horizontalMargin;
}
