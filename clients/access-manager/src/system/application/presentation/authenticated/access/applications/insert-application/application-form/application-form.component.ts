import {Component, ElementRef, EventEmitter, Inject, Input, OnInit, Output, Renderer} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions, MatSnackBar} from '@angular/material';
import {AuthenticatedViewComponent} from '../../../../authenticated-view.component';
import {MessageService} from '../../../../../../../domain/services/message.service';
import {debounce} from "../../../../../../utils/debounce";
import {FormBuilder, FormControl, Validators} from "@angular/forms"
import {ApplicationRepository} from "../../../../../../../domain/repository/application.repository";
import {CrudViewComponent} from "../../../../../../controls/crud/crud-view.component";
import {Application} from "../../../../../../../domain/entity/application.model";
import 'rxjs/add/operator/debounceTime';
import {AuthenticationService} from "../../../../../../../domain/services/authentication.service";

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

@Component({
  selector: 'application-form',
  templateUrl: './application-form.component.html',
  styleUrls: ['../../application.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class ApplicationFormComponent extends CrudViewComponent implements OnInit {

  @Input() entity: Application = new Application();

  @Output() save: EventEmitter<Application> = new EventEmitter();

  applications: any;

  application: Application = new Application();

  public debounce = debounce;

  /**
   *
   * @param router
   * @param snackBar
   * @param homeView
   * @param activatedRoute
   * @param messageService
   * @param applicationRepository
   * @param element
   * @param fb
   * @param renderer
   * @param authenticationService
   * @param applicationRepository
   */
  constructor(private router: Router,
              public snackBar: MatSnackBar,
              public activatedRoute: ActivatedRoute,
              private messageService: MessageService,
              private applicationRepository: ApplicationRepository,
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
    this.entity.enabled = true;

    this.form = this.fb.group({
      clientId: ['clientId', [Validators.required]],
    });

    // this.form
    //   .get('email')
    //   .valueChanges
    //   .pipe(
    //     debounceTime(100),
    //     switchMap(value =>
    //       this.userRepository.findByLdapApplicationname((value as string))
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
