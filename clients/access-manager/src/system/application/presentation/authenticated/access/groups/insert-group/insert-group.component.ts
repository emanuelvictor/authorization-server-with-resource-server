import {Component} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {Group} from "../../../../../../domain/entity/group.model";
import {GroupRepository} from "../../../../../../domain/repository/group.repository";

// @ts-ignore
@Component({
  selector: 'insert-groups',
  templateUrl: 'insert-group.component.html',
  styleUrls: ['../groups.component.scss']
})
export class InsertGroupComponent {

  /**
   *
   */
  group: Group = new Group();

  /**
   *
   * @param router
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param groupRepository
   */
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private homeView: AuthenticatedViewComponent,
              private groupRepository: GroupRepository) {

    homeView.toolbar.subhead = 'Grupo de Acesso / Adicionar';
    this.group.groupPermissions = [];

  }

  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.groupRepository.save(this.group)
      .then(() => {
        this.router.navigate(['access/groups']);
        this.messageService.toastSuccess();
      });
  }

}
