import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticatedViewComponent} from '../../../authenticated-view.component';
import {MessageService} from '../../../../../../domain/services/message.service';
import {debounce} from "../../../../../utils/debounce";
import {FormGroup} from "@angular/forms"
import {UserRepository} from "../../../../../../domain/repository/user.repository";

// @ts-ignore
@Component({
  selector: 'update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['../user.component.scss']
})
export class UpdateUserComponent implements OnInit {


  /**
   *
   */
  user: any = {
    organizacao: {},
    perfis: []
  };

  /**
   *
   */
  itsMe: boolean;
  error: boolean;

  /**
   * Exibir senha
   */
  inputType: string = 'password';

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
              private userRepository: UserRepository) {

    homeView.toolbar.subhead = 'Usuário / Editar';
    this.user.id = +this.activatedRoute.snapshot.params.id;

  }

  /**
   *
   */
  ngOnInit() {
    if (this.user && this.user.id) {
      this.findById();
      this.itsMe = this.homeView.itsMe(this.user);
    }
  }


  /**
   *
   */
  back() {
    if (this.activatedRoute.snapshot.routeConfig.path === 'edit/:id')
      this.router.navigate(['access/users']);
    else
      this.router.navigate(['access/users/' + this.user.id]);
  }

  /**
   *
   */
  public findById() {
    this.userRepository.findById(this.user.id)
      .subscribe(result => this.user = result);
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

    if (this.isString(this.user.grupoAcesso)) {
      this.messageService.toastWarning('Nenhum grupo de acesso válido foi selecionado.');
      return;
    }

    this.userRepository.save(this.user)
      .then(() => {
        this.router.navigate(['access/users']);
        this.messageService.toastSuccess(`Alterado com sucesso`, 5);
      });
  }

  /**
   * Exibir senha
   */
  public showPassword() {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string';
  }

}
