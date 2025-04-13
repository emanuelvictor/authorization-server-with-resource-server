import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar, MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions} from '@angular/material';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {MessageService} from '../../../../../../../domain/services/message.service';
import {debounce} from "../../../../../../utils/debounce";
import {FormBuilder, FormControl, Validators} from "@angular/forms"
import {UserRepository} from "../../../../../../../domain/repository/user.repository";
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {User} from "../../../../../../../domain/entity/user.model";
import 'rxjs/add/operator/debounceTime';
import {debounceTime, switchMap} from 'rxjs/operators';
import {AuthenticationService} from "../../../../../../../domain/services/authentication.service";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@Component({
  selector: 'user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['../../user.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class UserFormComponent extends CrudViewComponent implements OnInit {

  @Input() entity: User = new User();

  @Output() save: EventEmitter<User> = new EventEmitter();

  users: any;

  user: User = new User();

  public debounce = debounce;

  /**
   *
   * @param router
   * @param snackBar
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param userRepository
   * @param element
   * @param fb
   * @param renderer
   * @param authenticationService
   * @param userRepository
   */
  constructor(private router: Router,
              public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private userRepository: UserRepository,
              private homeView: AuthenticatedViewComponent,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer,
              public authenticationService: AuthenticationService) {

    super(snackBar, element, fb, renderer, activatedRoute);

  }

  /**
   *
   */
  ngOnInit() {
    this.entity.enable = true;

    this.form = this.fb.group({
      name: new FormControl({value: '', disabled: false}, Validators.required),
      username: ['username', [Validators.required/*, Validators.email*/]],
    });

    // this.form
    //   .get('email')
    //   .valueChanges
    //   .pipe(
    //     debounceTime(100),
    //     switchMap(value =>
    //       this.userRepository.findByLdapUsername((value as string))
    //     )
    //   )
    //   .subscribe(user => {
    //     if (user) {
    //
    //       this.users = [user];
    //
    //       if (this.form.get('email').value.includes('@')) {
    //
    //         this.entity.name = user.name;
    //         this.form.controls['name'].disable();
    //
    //       } else
    //
    //         this.form.controls['name'].enable();
    //
    //     } else {
    //
    //       this.users = [];
    //       this.form.controls['name'].enable();
    //
    //     }
    //   });

  }

  emit(entity: any) {
    this.save.emit(entity);
  }

  // /**
  //  *
  //  */
  // getEmail() {
  //   this.entity.email = this.form.get('email').value;
  // }
  //
  // notFirst: boolean = false;
  //
  // /**
  //  *
  //  * @param email
  //  */
  // displayFn(email) {
  //   if (this.notFirst)
  //     return email;
  //   else this.notFirst = true;
  // }
}
