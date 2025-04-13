import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {GroupRepository} from "../../../../../../domain/repository/group.repository";
import {DialogService} from "../../../../../../domain/services/dialog.service";
import {Group} from "../../../../../../domain/entity/group.model";
import {PermissionRepository} from "../../../../../../domain/repository/permission.repository";
import {Permission} from "../../../../../../domain/entity/permission.model";

// @ts-ignore
@Component({
  selector: 'view-groups',
  templateUrl: 'view-group.component.html',
  styleUrls: ['../groups.component.scss']
})
export class ViewGroupComponent implements OnInit {

  /**
   *
   */
  permissions: Permission[];

  /**
   *
   */
  group: Group = new Group();

  /**
   *
   * @param router
   * @param homeView
   * @param dialogService
   * @param activatedRoute
   * @param messageService
   * @param groupRepository
   */
  constructor(private router: Router,
              private dialogService: DialogService,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private groupRepository: GroupRepository) {

    this.group.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Grupo de Acesso / Detalhes';

  }

  /**
   *
   */
  ngOnInit() {
    if (this.group && this.group.id) {
      this.findById();
    }
  }

  /**
   *
   */
  public findById() {
    this.groupRepository.findById(this.group.id)
      .subscribe((result) => {
        this.group = result;
      })
  }

  /**
   * Função para confirmar a exclusão de um registro permanentemente
   * @param group
   */
  public openDeleteDialog(group) {

    this.dialogService.confirmDelete(group, 'Grupo de Acesso')
      .then((accept: boolean) => {

        if (accept) {
          this.groupRepository.delete(group.id)
            .then(() => {
              this.router.navigate(['access/groups']);
              this.messageService.toastSuccess('Registro excluído com sucesso')
            })
        }
      })
  }
}
