import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, RouterState, UrlSegmentGroup, PRIMARY_OUTLET, UrlSegment, UrlTree } from '@angular/router';
import { AuthenticatedViewComponent } from 'system/application/presentation/authenticated/authenticated-view.component';
import { MessageService } from 'system/domain/services/message.service';
import { BaseRepository } from 'system/infrastructure/repository/base/base.repository';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS, MatFormFieldDefaultOptions } from '@angular/material';

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline'
};

// @ts-ignore
@Component({
  selector: 'sistema-entity-form',
  templateUrl: './entity-form.component.html',
  styleUrls: ['./entity-form.component.scss'],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance
    }
  ]
})
export class EntityFormComponent implements OnInit {


  @Input() headline: string;
  @Input() subhead: string;
  @Input() data: any;
  @Input() entity: any = {};
  @Input() operation: any;
  @Input() repository: BaseRepository<any>;
  @Input() form: any;

  private state: any;

  //[entity]="entity" [operation]="operation"

  constructor(private router: Router,
    private homeView: AuthenticatedViewComponent,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService) {

    this.state = router.routerState.snapshot.url;

  }

  ngOnInit() {

    this.entity.id = +this.activatedRoute.snapshot.params.id;

    if (this.entity && this.entity.id) {
      this.findById();
    }
  }

  public findById() {
    this.repository.findById(this.entity.id)
      .subscribe(result => this.entity = result);
  }

  public save(form) {

    if (form.invalid) {
      this.messageService.toastWarning();
      return;
    }

    this.repository.save(this.entity)
      .then(() => {

        let tree: UrlTree = this.router.parseUrl(this.state);
        const g: UrlSegmentGroup = tree.root.children[PRIMARY_OUTLET];
        const s: UrlSegment[] = g.segments;

        let url: string = s[0].path +"/"+ s[1].path;

        this.router.navigate(["/" + url]);

        if (this.operation === "save") {
          this.messageService.toastSuccess(`Salvo com sucesso`, 5);
        }

        else {
          this.messageService.toastSuccess(`Alterado com sucesso`, 5);
        }
      });
  }

  /**
  * Helper
  * @param value
  */
  public isString(value): boolean {
    return typeof value === 'string';
  }

}
