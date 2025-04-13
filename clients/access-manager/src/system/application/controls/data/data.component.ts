import {Component, Input, OnInit} from '@angular/core';

// @ts-ignore
@Component({
  selector: 'data',
  templateUrl: 'data.component.html'
})
export class DataComponent implements OnInit {

  /**
   *
   */
  @Input() type: any = 'NORMAL';

  /**
   *
   */
  @Input() colors: any;

  /**
   *
   */
  @Input() name: any;

  /**
   *
   */
  @Input() data: any;

  /**
   *
   */
  @Input() translate: any;

  /**
   *
   */
  display: any;

  /**
   *
   */
  ngOnInit(): void {
    if (!this.type)
      this.type = 'NORMAL';

    if (!this.display)
      this.display = this.getDataFromColumnName(this.data, this.name)
  }

  /**
   *
   * @param data
   * @param name
   */
  getDataFromColumnName(data: any, name: any) {
    if (name.indexOf('.') > 0)
      if (data[name.substring(0, name.indexOf('.'))]) {
        if (this.display) {
          return this.display;
        }
        return this.getDataFromColumnName(data[name.substring(0, name.indexOf('.'))], name.substring(name.indexOf('.') + 1, name.length));
      } else return null;
    else {
      if (data && name && data[name].constructor.name === 'Boolean')
        return data[name].toString();
      return data && name && name.length ? data[name] : undefined
    }
  }
}