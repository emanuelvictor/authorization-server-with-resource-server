import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {TenantRepository} from "../../../../../../domain/repository/tenant.repository";
import {DialogService} from "../../../../../../domain/services/dialog.service";
import {Tenant} from "../../../../../../domain/entity/tenant.model";
import {Permission} from "../../../../../../domain/entity/permission.model";

@Component({
    selector: 'view-tenants',
    templateUrl: 'view-tenant.component.html',
    styleUrls: ['../tenants.component.scss']
})
export class ViewTenantComponent implements OnInit {

    /**
     *
     */
    permissions: Permission[];

    /**
     *
     */
    tenant: Tenant = new Tenant();

    /**
     *
     * @param router
     * @param homeView
     * @param dialogService
     * @param activatedRoute
     * @param messageService
     * @param tenantRepository
     */
    constructor(private router: Router,
                private dialogService: DialogService,
                public activatedRoute: ActivatedRoute,
                private messageService: MessageService,
                private homeView: AuthenticatedViewComponent,
                private tenantRepository: TenantRepository) {

        this.tenant.id = +this.activatedRoute.snapshot.params.id || null;
        homeView.toolbar.subhead = 'Tenant / Detalhes';

    }

    /**
     *
     */
    ngOnInit() {
        if (this.tenant && this.tenant.id) {
            this.findById();
        }
    }

    /**
     *
     */
    public findById() {
        this.tenantRepository.findById(this.tenant.id)
            .subscribe((result) => {
                this.tenant = result;
            })
    }

    /**
     * Função para confirmar a exclusão de um registro permanentemente
     * @param tenant
     */
    public openDeleteDialog(tenant) {

        this.dialogService.confirmDelete(tenant, 'Tenant')
            .then((accept: boolean) => {

                if (accept) {
                    this.tenantRepository.delete(tenant.id)
                        .then(() => {
                            this.router.navigate(['access/tenants']);
                            this.messageService.toastSuccess('Registro excluído com sucesso')
                        })
                }
            })
    }
}
