import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CrudViewComponent} from '../crud-view.component';

// @ts-ignore
@Component({
    selector: 'detail-page',
    templateUrl: 'detail-page.component.html'
})
export class DetailPageComponent extends CrudViewComponent implements OnInit {
    
    @Input() backLink: string; // Armazena o link para redirecionar para a tela de consulta    
    @Input() editLink: string; // Armazena o link para redirecionar para a tela de edição

    @Output() updateStatus = new EventEmitter();

    ngOnInit() {
        this.subhead = `${this.subhead} / Detalhes`;
        this.handleLabelStatus();
    }

    updateStatusEntity = () => this.updateStatus.emit();
}
