import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {Tenant} from "../../../../../../../domain/entity/tenant.model";

// @ts-ignore
@Component({
    selector: 'tenant-data-view',
    templateUrl: 'tenant-data-view.component.html',
    styleUrls: ['../../tenants.component.scss']
})
export class TenantDataViewComponent implements OnInit {

    @Input()
    readOnly: boolean = false;

    @Input()
    tenant: Tenant;

    constructor(homeView: AuthenticatedViewComponent,
                public activatedRoute: ActivatedRoute) {
        homeView.toolbar.subhead = 'Tenant / Detalhes';
    }

    async ngOnInit() {
    }
}
