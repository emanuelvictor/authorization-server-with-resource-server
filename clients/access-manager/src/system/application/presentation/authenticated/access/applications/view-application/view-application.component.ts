import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {ApplicationRepository} from "../../../../../../domain/repository/application.repository";
import {viewAnimation} from "../../../../../utils/utils";
import {UpdatePasswordComponent} from "../update-password/update-password.component";
import {MatDialog} from "@angular/material";
import {Application} from "../../../../../../domain/entity/application.model";

// @ts-ignore
@Component({
  selector: 'view-application',
  templateUrl: './view-application.component.html',
  styleUrls: ['../application.component.scss'],
  animations: [
    viewAnimation
  ]
})
export class ViewApplicationComponent implements OnInit {

  /**
   *
   */
  application: Application = new Application();

  /**
   *
   */
  itsMe: boolean;

  /**
   *
   * @param router
   * @param dialog
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param applicationRepository
   */
  constructor(private router: Router,
              private dialog: MatDialog,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              public homeView: AuthenticatedViewComponent,
              private applicationRepository: ApplicationRepository) {
    this.application.id = +this.activatedRoute.snapshot.params.id || null;
    homeView.toolbar.subhead = 'Aplicativo / Detalhes'
  }

  /**
   *
   */
  ngOnInit() {
    if (this.application && this.application.id) {
      this.findById();
      this.itsMe = this.homeView.itsMe(this.application)
    } else this.router.navigate(["access/applications"])
  }

  /**
   *
   */
  public findById() {
    this.applicationRepository.findById(this.application.id)
      .subscribe(result => this.application = result)
  }

  /**
   *
   */
  public updateEnabled(id: number) {
    this.applicationRepository.updateEnable(id)
      .then((enabled) => {
        this.application.enabled = enabled;
        this.messageService.toastSuccess(this.application.enabled ? 'Ativado com sucesso' : 'Inativado com sucesso')
      })
  }

  /**
   *
   */
  public updatePassword() {
    this.dialog.open(UpdatePasswordComponent, {
      width: '400px',
      height: 'auto',
      data: {application: this.application || null}
    })
  }
}
