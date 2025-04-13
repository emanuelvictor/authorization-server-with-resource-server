import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {GroupRepository} from "../../../../../../domain/repository/group.repository";
import {Group} from "../../../../../../domain/entity/group.model";

// @ts-ignore
@Component({
  selector: 'update-group',
  templateUrl: 'update-group.component.html',
  styleUrls: ['../groups.component.scss']
})
export class UpdateGroupComponent implements OnInit {


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
    homeView.toolbar.subhead = 'Grupo de Acesso / Editar';
  }

  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['access/groups']);
    else
      this.router.navigate(['access/groups/' + (+this.activatedRoute.snapshot.params.id)]);
  }

  /**
   *
   */
  ngOnInit() {
    this.findById();
  }

  /**
   *
   */
  public findById() {
    this.groupRepository.findById(+this.activatedRoute.snapshot.params.id)
      .subscribe((result) =>
        this.group = result
      );
  }

  /**
   *
   * @param form
   */
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
