import { Component, Output, EventEmitter } from '@angular/core';

// @ts-ignore
@Component({
    selector: 'button-clear-filters',
    templateUrl: 'button-clear-filters.component.html'
})
export class ButtonClearFiltersComponent {

    @Output() clear = new EventEmitter();

    clearFilters = () => this.clear.emit();
}
