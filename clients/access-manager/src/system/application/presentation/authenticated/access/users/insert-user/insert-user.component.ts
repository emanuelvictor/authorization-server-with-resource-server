import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticatedViewComponent } from '../../../authenticated-view.component';
import { MessageService } from '../../../../../../domain/services/message.service';
import { UserRepository } from "../../../../../../domain/repository/user.repository";
import { User } from "../../../../../../domain/entity/user.model";

// @ts-ignore
@Component({
  selector: 'insert-user',
  templateUrl: './insert-user.component.html',
  styleUrls: ['../user.component.scss']
})
export class InsertUserComponent implements OnInit {

  /**
   *
   */
  user: User;

  /**
   *
   */
  itsMe: boolean;

  /**
   *
   */
  error: boolean;

  /**
   *
   * @param router
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param userRepository
   */
  constructor(private router: Router,
    private homeView: AuthenticatedViewComponent,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private userRepository: UserRepository,) {

    if (!this.activatedRoute.snapshot.params.id) {
      homeView.toolbar.subhead = 'Usuário / Adicionar';
    }

  }

  /**
   *
   */
  ngOnInit() {
    if (this.user && this.user.id) {
      this.findById();
      this.itsMe = this.homeView.itsMe(this.user);
    }

    // this.listPerfis();
  }

  /**
   *
   */
  public findById() {
    this.userRepository.findById(this.user.id)
      .subscribe(result => this.user = result)
  }

  /**
   *
   * @param user
   */
  public save(user: User) {
    this.userRepository.save(user)
      .then(() => {
        this.router.navigate(['access/users']);
        this.messageService.toastSuccess(`Novo usuário cadastrado.`, 5)
      })
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string'
  }

}
