import {Component, ElementRef, EventEmitter, Inject, Input, OnDestroy, OnInit, Output, Renderer} from '@angular/core';
import {debounce} from "../../../../../../../utils/debounce";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms"
import {GroupRepository} from "../../../../../../../../domain/repository/group.repository";
import {Group} from "../../../../../../../../domain/entity/group.model";

// @ts-ignore
@Component({
  selector: 'root-form',
  templateUrl: './root-form.component.html',
  styleUrls: ['../../../user.component.scss']
})
export class RootFormComponent implements OnInit, OnDestroy {

  /**
   *
   */
  groups: any = [];

  /**
   *
   */
  @Input()
  group: Group = new Group();

  /**
   *
   */
  @Output()
  public groupChange = new EventEmitter();

  error: boolean;

  public debounce = debounce;

  @Input()
  form: FormGroup;

  /**
   *
   * @param element
   * @param fb
   * @param renderer
   * @param groupRepository
   */
  constructor(@Inject(ElementRef) private element: ElementRef,
              private fb: FormBuilder, private renderer: Renderer,
              private groupRepository: GroupRepository) {

  }

  /**
   *
   */
  ngOnInit() {

    const formGroup = new FormGroup({
      group: new FormControl('group', [Validators.required]),
    });

    if (!this.form) {
      this.form = this.fb.group({});
    }

    this.form.addControl('group', formGroup);

  }

  /**
   * Exibe organizações para o autocomplete
   */
  public listAccessGroups() {
    let nameAccessGroup = this.group || null;
    if (this.isString(nameAccessGroup) && !(nameAccessGroup as any).length) {
      this.groups = [];
      return;
    }

    this.groupRepository.listByFilters({defaultFilter: this.group, ativoFilter: true})
      .subscribe((result) => {
        this.groups = result.content;
      });
  }

  /**
   * Expressão específica para autocomplete
   */
  public displayNameAccessGroup(group) {
    return group && group.name ? group.name : null;
  }

  /**
   * Helper
   * @param value
   */
  public isString(value): boolean {
    return typeof value === 'string';
  }

  /**
   *
   */
  public normalizeAccessGroup() {
    if (this.isString(this.group)) {
      this.error = false;
      this.group = null;
    }
  }

  /**
   *
   */
  ngOnDestroy(): void {
    /**
     * Remove o control quando o componente é destruído
     */
    this.form.removeControl('group');
  }

}
