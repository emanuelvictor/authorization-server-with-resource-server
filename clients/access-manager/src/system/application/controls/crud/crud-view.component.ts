import {Component, ElementRef, EventEmitter, Inject, Input, Output, Renderer} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatSnackBar} from "@angular/material";
import {FormBuilder} from "@angular/forms";
import {CrudViewInterface} from "./crud-view.inteface";

// Para diferenciar se a entidade é uma palavra masculina ou feminina
export type Gender = 'M' | 'F';

// @ts-ignore
@Component({selector: 'crud-view', template: ''})
export class CrudViewComponent implements CrudViewInterface {

  public labelStatus: any = {}; // Armazena o texto que será exibido de acordo com o gênero

  /**
   * Cabeçalho
   */
  @Input() headline: string = 'Cadastros'; // Armazena o título padrão da página
  @Input() subhead: string; // Armazena o subtítulo padrão da página
  @Input() gender: Gender; // Armazena o gênero da entidade para tratar as labels conforme o mesmo

  /**
   * Utilizado apenas nos componentes de FORM e DETAIL
   */
  @Input() entity: any = {}; // Recebe a entidade corrente


  @Output() entityChange = new EventEmitter();
  @Input() hasDescription: boolean = false; // Verifica se a entidade possui o campo descricao

  /**
   *
   */
  @Output() save = new EventEmitter();
  public form: any;

  /**
   *
   * @param snackBar
   * @param element
   * @param fb
   * @param renderer
   * @param activatedRoute
   */
  constructor(public snackBar: MatSnackBar,
              @Inject(ElementRef) public element: ElementRef,
              public fb: FormBuilder, public renderer: Renderer,
              public activatedRoute: ActivatedRoute) {
  }

  /**
   * Manipula as labels do Status de acordo com o gênero informado
   */
  handleLabelStatus = () => {
    if (this.gender === 'M') {
      this.labelStatus = {all: 'Todos', active: 'Ativo', inactive: 'Inativo'};
    } else {
      this.labelStatus = {all: 'Todas', active: 'Ativa', inactive: 'Inativa'};
    }
  };

  /**
   *
   */
  public saveEntity(form: any): void {
    let valid = true;
    const controls: any = [];
    Object.keys(form.controls).map(function (key) {
      if (form.controls[key].invalid) {
        const control = form.controls[key];
        control.key = '#' + key;
        if (control.controls) {
          Object.keys(control.controls).map(function (key) {
            if (control.controls[key].invalid) {
              const controlInner = control.controls[key];
              controlInner.key = '#' + key;
              controls.push(controlInner);
            }
          });
        } else {
          controls.push(control);
        }
      }
    });

    for (const control of controls) {
      if (control) {
        const element = this.element.nativeElement.querySelector(control.key);
        if (element && control.invalid) {
          this.renderer.invokeElementMethod(element, 'focus', []);
          valid = false;
          if (control.errors.exception)
            this.error(control.errors.exception);
          break;
        }
        if (control.controls && control.invalid) {
          for (const controlInner of control.controls) {
            const elemento = this.element.nativeElement.querySelector(controlInner.key);
            if (elemento && controlInner.invalid) {
              this.renderer.invokeElementMethod(elemento, 'focus', []);
              valid = false;
              if (controlInner.errors.exception)
                this.error(controlInner.errors.exception);
              break;
            }
          }
        }
      }
    }

    if (form.valid && valid) {
      this.emit(this.entity);
    }
  }

  /**
   *
   * @param entity
   */
  emit(entity: any): void {
    this.save.emit(entity)
  }

  /**
   *
   * @param message
   */
  public error(message: string) {
    this.openSnackBar(message);
  }

  /**
   *
   * @param message
   */
  public openSnackBar(message: string) {
    this.snackBar.open(message, 'Fechar', {
      duration: 5000
    });
  }

}
