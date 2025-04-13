import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// @ts-ignore
@Component({
  selector: 'sistema-form-toolbar',
  templateUrl: './form-toolbar.component.html',
})
export class FormToolbarComponent implements OnInit {

  @Input() public headline: any;  
  @Input() public subhead: any;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }

  back() {
    let currentUri = this.activatedRoute.snapshot.routeConfig.path;

    if(currentUri == "edit/:id") {
      this.router.navigate(['../../'], { relativeTo: this.activatedRoute });
    } else {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    }
  }
}
