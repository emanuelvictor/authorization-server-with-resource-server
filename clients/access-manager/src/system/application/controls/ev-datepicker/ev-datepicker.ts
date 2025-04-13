import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from "@angular/core";
import * as moment from 'moment';
import 'moment/locale/pt-br';

// @ts-ignore
@Component({
  selector: 'ev-datepicker',
  templateUrl: './ev-datepicker.html'
})
export class EvDatepicker implements OnChanges, OnInit {

  /**
   *
   */
  @Input() dataInput: any;

  /**
   *
   */
  data: any;

  /**
   *
   * @type {EventEmitter<any>}
   */
  @Output() dataInputChange = new EventEmitter();

  /**
   *
   */
  changeData() {
    this.dataInputChange.emit(moment(this.data, "DD/MM/YYYY").locale('pt-BR').format("DD/MM/YYYY"));
  }

  /**
   *
   */
  ngOnInit(): void {
    if (this.dataInput)
      this.data = moment(this.dataInput, "DD/MM/YYYY").locale('pt-BR').toDate();
  }

  /**
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges) {
    if (!changes.dataInput.firstChange) {
      this.data = moment(changes.dataInput.currentValue, "DD/MM/YYYY").locale('pt-BR').toDate();
    }
  }
}
