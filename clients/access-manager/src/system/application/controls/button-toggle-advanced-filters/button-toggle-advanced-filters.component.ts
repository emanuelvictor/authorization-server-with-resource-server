import { Component, Input } from '@angular/core';
import { tdCollapseAnimation } from '@covalent/core';

// @ts-ignore
@Component({
    selector: 'button-toggle-advanced-filters',
    templateUrl: 'button-toggle-advanced-filters.component.html',
    styleUrls: ['./button-toggle-advanced-filters.component.scss'],
    animations: [tdCollapseAnimation]
})
export class ButtonToggleAdvancedFiltersComponent {
    @Input() advancedFiltersActive: boolean;
}
