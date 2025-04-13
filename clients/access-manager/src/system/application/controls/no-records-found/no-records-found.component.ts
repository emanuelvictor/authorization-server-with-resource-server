import {Component, Input} from '@angular/core';

// @ts-ignore
@Component({
    selector: 'no-records-found',
    templateUrl: 'no-records-found.component.html',
    styleUrls: ['./no-records-found.component.scss']
})
export class NoRecordsFoundComponent {
    @Input() dataSource: any;
}
