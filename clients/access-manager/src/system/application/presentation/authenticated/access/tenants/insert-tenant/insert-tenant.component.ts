import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {Tenant} from "../../../../../../domain/entity/tenant.model";
import {TenantRepository} from "../../../../../../domain/repository/tenant.repository";

// @ts-ignore
@Component({
    selector: 'insert-tenants',
    templateUrl: 'insert-tenant.component.html',
    styleUrls: ['../tenants.component.scss']
})
export class InsertTenantComponent {

    /**
     *
     */
    tenant: Tenant = new Tenant();

    /**
     *
     * @param router
     * @param homeView
     * @param messageService
     * @param tenantRepository
     */
    constructor(private router: Router,
                private messageService: MessageService,
                private homeView: AuthenticatedViewComponent,
                private tenantRepository: TenantRepository) {

        homeView.toolbar.subhead = 'Cliente / Adicionar';

    }

    public save(form) {

        if (form.invalid) {
            this.messageService.toastWarning();
            return;
        }

        this.tenantRepository.save(this.tenant)
            .then(() => {
                this.router.navigate(['access/tenants']);
                this.messageService.toastSuccess();
            });
    }

}
